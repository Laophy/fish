const { execSync } = require("child_process");

// Clean previous builds
console.log("Cleaning previous builds...");
execSync("npm run clean", { stdio: "inherit" });

// Build the application
console.log("Building application...");
execSync("npm run build", { stdio: "inherit" });

// Package with electron-builder
console.log("Packaging with electron-builder...");
execSync("electron-builder", { stdio: "inherit" });

console.log("Packaging complete!");
