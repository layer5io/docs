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

	// Iterate over the JSON data
	for _, entry := range pricingData {
		if strings.HasPrefix(entry.Documentation, "https://docs.layer5.io/") {
			fmt.Println("\n--- Processing documentation URL ---")
			fmt.Println("Documentation URL:", entry.Documentation)

			// Remove the base URL and split by "/"
			urlParts := strings.Split(strings.TrimPrefix(entry.Documentation, "https://docs.layer5.io/"), "/")

			// Initialize folder path to "content/en/"
			folderPath := "content/en"
			fmt.Println("Starting folder path:", folderPath)

			// Extract hash if present
			urlHash := ""
			for i, part := range urlParts {
				if strings.HasPrefix(part, "#") {
					urlHash = strings.TrimPrefix(part, "#")
					urlParts = urlParts[:i]
					break
				}
			}

			// Build the path step by step
			for _, part := range urlParts {
				if part == "" {
					continue
				}
				folderPath = filepath.Join(folderPath, part)
				fmt.Println("Updated folder path:", folderPath)
			}

			// Target the _index.md file inside the last folder
			filePath := filepath.Join(folderPath, "_index.md")
			fmt.Println("Targeting _index.md file:", filePath)

			// Process the file
			processFile(filePath, entry, urlHash)
		}
	}
}

func processFile(filePath string, entry PricingData, urlHash string) {
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

	shortcode := fmt.Sprintf(`{{< feature-support feature_name="%s" >}}`, entry.EntireRow.Feature)
	contentStr := string(content)
	var newContent string

	if urlHash == "" {
		// No hash: add shortcode after the front matter
		frontMatterEnd := strings.Index(contentStr, "---")
		if frontMatterEnd != -1 {
			frontMatterEnd = strings.Index(contentStr[frontMatterEnd+3:], "---")
			if frontMatterEnd != -1 {
				frontMatterEnd += 6 // Adjust for the second "---"
				newContent = contentStr[:frontMatterEnd] + "\n" + shortcode + "\n" + contentStr[frontMatterEnd:]
				fmt.Printf("Added shortcode after front matter in %s\n", filePath)
			} else {
				// If second "---" not found, add to the end
				newContent = contentStr + "\n\n" + shortcode
				fmt.Printf("Front matter end not found, added shortcode at the end of %s\n", filePath)
			}
		} else {
			// If no front matter found, add to the beginning
			newContent = shortcode + "\n\n" + contentStr
			fmt.Printf("No front matter found, added shortcode at the beginning of %s\n", filePath)
		}
	} else {
		// Hash present: search for matching heading and add shortcode below
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

			newContent = contentStr[:endOfLine] + "\n\n" + shortcode + "\n" + contentStr[endOfLine:]
			fmt.Printf("Added shortcode below matching heading for %s\n", filePath)
		} else {
			fmt.Printf("Hash '%s' not found in file %s, adding shortcode at the end\n", urlHash, filePath)
			newContent = contentStr + "\n\n" + shortcode
		}
	}

	err = ioutil.WriteFile(filePath, []byte(newContent), 0644)
	if err != nil {
		fmt.Printf("Error writing to file %s: %v\n", filePath, err)
	} else {
		fmt.Printf("Updated file with shortcode for %s\n", filePath)
	}
}