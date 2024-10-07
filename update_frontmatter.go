package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

type PricingData struct {
	Documentation string `json:"documentation"`
	EntireRow     struct {
		Feature          string `json:"Feature"`
		SubscriptionTier string `json:"Subscription Tier"`
	} `json:"entire_row"`
}

func main() {
	// Read the JSON file
	jsonFile, err := ioutil.ReadFile("pricing_data.json")
	if err != nil {
		fmt.Println("Error reading JSON file:", err)
		return
	}

	var pricingData []PricingData
	err = json.Unmarshal(jsonFile, &pricingData)
	if err != nil {
		fmt.Println("Error parsing JSON:", err)
		return
	}

	// Group entries by documentation URL
	groupedEntries := make(map[string][]PricingData)
	for _, entry := range pricingData {
		if strings.HasPrefix(entry.Documentation, "https://docs.layer5.io/") {
			groupedEntries[entry.Documentation] = append(groupedEntries[entry.Documentation], entry)
		}
	}

	// Process each group
	for docURL, entries := range groupedEntries {
		fmt.Println("\n--- Processing documentation URL ---")
		fmt.Println("Documentation URL:", docURL)

		// Extract path and hash
		urlParts, urlHash := extractHash(docURL)

		// Build the folder path
		folderPath := buildPath("content/en", urlParts)
		fmt.Println("Final folder path:", folderPath)

		// Target the _index.md file inside the last folder
		filePath := filepath.Join(folderPath, "_index.md")
		fmt.Println("Targeting _index.md file:", filePath)

		// Process the file
		processFileWithMultipleEntries(filePath, entries, urlHash)
	}
}

func extractHash(url string) ([]string, string) {
	urlParts := strings.Split(strings.TrimPrefix(url, "https://docs.layer5.io/"), "/")
	var urlHash string
	for i, part := range urlParts {
		if strings.HasPrefix(part, "#") {
			urlHash = strings.TrimPrefix(part, "#")
			urlParts = urlParts[:i]
			break
		}
	}
	return urlParts, urlHash
}

func buildPath(basePath string, parts []string) string {
	for _, part := range parts {
		if part == "" {
			continue
		}
		basePath = filepath.Join(basePath, part)
	}
	return basePath
}

func processFileWithMultipleEntries(filePath string, entries []PricingData, urlHash string) {
	content, err := ioutil.ReadFile(filePath)
	if err != nil {
		if os.IsNotExist(err) {
			fmt.Printf("File %s does not exist, creating new file\n", filePath)
			content = []byte{}
		} else {
			fmt.Printf("Error reading file %s: %v\n", filePath, err)
			return
		}
	}

	contentStr := string(content)
	tierFeatures := make(map[string][]string)

	// Collect features for each tier
	for _, entry := range entries {
		tier := strings.ToLower(entry.EntireRow.SubscriptionTier)
		tierFeatures[tier] = append(tierFeatures[tier], entry.EntireRow.Feature)
	}

	// Process free tier
	if freeFeatures, exists := tierFeatures["free"]; exists && len(freeFeatures) > 0 {
		consolidatedFeature := strings.Join(freeFeatures, " ")
		shortcode := fmt.Sprintf(`{{< feature-support feature_name="%s" >}}`, consolidatedFeature)
		contentStr = insertConsolidatedShortcode(contentStr, shortcode, filePath)
	}

	// Process non-free tiers
	for tier, features := range tierFeatures {
		if tier == "free" {
			continue
		}
		var tierShortcodes []string
		for _, feature := range features {
			shortcode := fmt.Sprintf(`{{< feature-support feature_name="%s" >}}`, feature)
			tierShortcodes = append(tierShortcodes, shortcode)
		}
		contentStr = insertShortcodesAfterHeadings(contentStr, tierShortcodes, urlHash, filePath)
	}

	err = ioutil.WriteFile(filePath, []byte(contentStr), 0644)
	if err != nil {
		fmt.Printf("Error writing to file %s: %v\n", filePath, err)
	} else {
		fmt.Printf("Updated file with consolidated shortcodes for %s\n", filePath)
	}
}

func insertConsolidatedShortcode(contentStr, shortcode, filePath string) string {
	// Remove any existing feature-support shortcodes
	re := regexp.MustCompile(`(?s){{<\s*feature-support.*?>}}`)
	contentStr = re.ReplaceAllString(contentStr, "")

	// Insert the consolidated shortcode after front matter
	frontMatterEnd := strings.Index(contentStr, "---")
	if frontMatterEnd != -1 {
		frontMatterEnd = strings.Index(contentStr[frontMatterEnd+3:], "---")
		if frontMatterEnd != -1 {
			frontMatterEnd += 6 // Adjust for the second "---"
			fmt.Printf("Added consolidated free shortcode after front matter in %s\n", filePath)
			return contentStr[:frontMatterEnd] + "\n" + shortcode + "\n" + contentStr[frontMatterEnd:]
		}
	}
	// If no front matter or second "---" found, insert at the beginning
	fmt.Printf("Front matter end not found, added consolidated free shortcode at the beginning of %s\n", filePath)
	return shortcode + "\n\n" + contentStr
}

func insertShortcodesAfterHeadings(contentStr string, shortcodes []string, urlHash string, filePath string) string {
	hashPattern := strings.ReplaceAll(urlHash, "-", "[-\\s]")
	hashRegex := regexp.MustCompile(`(?im)^#+\s*` + hashPattern)

	hashMatch := hashRegex.FindStringIndex(contentStr)
	if hashMatch != nil {
		endOfLine := strings.Index(contentStr[hashMatch[1]:], "\n")
		if endOfLine == -1 {
			endOfLine = len(contentStr)
		} else {
			endOfLine += hashMatch[1]
		}
		shortcodesStr := strings.Join(shortcodes, "\n")
		fmt.Printf("Added non-free shortcodes below matching heading for %s\n", filePath)
		contentStr = contentStr[:endOfLine] + "\n\n" + shortcodesStr + "\n" + contentStr[endOfLine:]
	} else {
		// If hash not found, append at the end
		fmt.Printf("Hash '%s' not found in file %s, adding non-free shortcodes at the end\n", urlHash, filePath)
		shortcodesStr := strings.Join(shortcodes, "\n")
		contentStr += "\n\n" + shortcodesStr
	}
	return contentStr
}