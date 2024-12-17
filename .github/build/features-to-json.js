#!/usr/bin/env node
const fs = require("fs").promises;
const csv = require("csvtojson");

const headers = [
  "Theme",
  "Category Order",
  "Category",
  "Function Order", 
  "Function",
  "Feature",
  "Subscription Tier",
  "Free",
  "Team Designer",
  "Team Operator",
  "Enterprise",
  "Exclude",
  "Docs",
];

async function processCSV() {
  try {
    // Default paths, can be overridden by command line arguments
    const csvFilePath = process.argv[2] || ".github/build/spreadsheet.csv";
    const featuresFile = process.argv[3] || "data/feature_data.json";

    // Log file paths if custom paths are provided
    if (process.argv[2]) {
      console.log("Reading features from: " + process.argv[2]);
    }
    if (process.argv[3]) {
      console.log("Outputting JSON to: " + process.argv[3]);
    }

    // Read CSV and parse
    const rows = await csv({
      noheader: true,
      headers: headers,
      output: "json",
    }).fromFile(csvFilePath);

    // Filter and transform rows
    const filteredData = rows
      .filter(row => {
        // Only include rows with a non-empty docs column
        const docsValue = row["Docs"]?.trim();
        return docsValue && docsValue !== "";
      })
      .map(row => {
        // Transform row to desired structure
        return {
          theme: row["Theme"]?.trim(),
          categoryOrder: row["Category Order"]?.trim(),
          category: row["Category"]?.trim(),
          functionOrder: row["Function Order"]?.trim(),
          function: row["Function"]?.trim(),
          feature: row["Feature"]?.trim(),
          subscriptionTier: row["Subscription Tier"]?.trim(),
          comparisonTiers: {
            free: row["Free"]?.trim().toLowerCase() === 'x',
            teamDesigner: row["Team Designer"]?.trim().toLowerCase() === 'x',
            teamOperator: row["Team Operator"]?.trim().toLowerCase() === 'x',
            enterprise: row["Enterprise"]?.trim().toLowerCase() === 'x'
          },
          docs: row["Docs"]?.trim()
        };
      });

    // Write filtered data to JSON file
    try {
      await fs.writeFile(
        featuresFile, 
        JSON.stringify(filteredData, null, 2)
      );
      console.log(`Successfully wrote ${filteredData.length} features to ${featuresFile}`);
    } catch (error) {
      console.error("Error writing to features JSON file:", error);
      process.exit(1);
    }

  } catch (error) {
    console.error("Error processing CSV:", error);
    process.exit(1);
  }
}

processCSV();