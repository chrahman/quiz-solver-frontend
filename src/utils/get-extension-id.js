/**
 * Get Extension ID Script
 *
 * Run this script in the browser console to get the extension ID
 * for the Quiz Solver extension.
 *
 * Usage:
 * 1. Install the extension
 * 2. Open browser console
 * 3. Run this script
 * 4. Copy the extension ID to the extension-integration.ts file
 */

// Function to get extension ID
function getExtensionId() {
  // Method 1: Check if extension is installed by trying to communicate
  const extensionId = "ajdgfcjkghfponpmbikgecgdelokekae"; // This will be replaced with actual ID

  // Try to ping the extension
  if (typeof chrome !== "undefined" && chrome.runtime) {
    chrome.runtime.sendMessage(extensionId, { type: "ping" }, (response) => {
      if (chrome.runtime.lastError) {
        console.log("Extension not found or not responding");
        console.log("Error:", chrome.runtime.lastError.message);
      } else {
        console.log("Extension is installed and responding!");
        console.log("Extension ID:", extensionId);
      }
    });
  } else {
    console.log("Chrome runtime not available");
  }
}

// Alternative method: Check all installed extensions
function listAllExtensions() {
  if (typeof chrome !== "undefined" && chrome.management) {
    chrome.management.getAll((extensions) => {
      console.log("All installed extensions:");
      extensions.forEach((ext) => {
        if (ext.name.includes("Quiz Solver") || ext.name.includes("Gemini")) {
          console.log("Found Quiz Solver extension:");
          console.log("- Name:", ext.name);
          console.log("- ID:", ext.id);
          console.log("- Version:", ext.version);
          console.log("- Enabled:", ext.enabled);
        }
      });
    });
  } else {
    console.log("Chrome management API not available");
  }
}

// Run the functions
console.log("=== Quiz Solver Extension ID Finder ===");
getExtensionId();
listAllExtensions();

console.log("\n=== Instructions ===");
console.log("1. Look for the extension ID in the output above");
console.log("2. Copy the extension ID");
console.log("3. Update the EXTENSION_ID in src/utils/extension-integration.ts");
console.log("4. The extension ID will look something like: abcdefghijklmnopqrstuvwxyz123456");
