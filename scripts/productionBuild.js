const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const packageJson = require("../package.json");

const APP_NAME = "fish_clicker";
const VERSION = packageJson.version;
const BUILD_DIR = path.join(__dirname, "../production");
const TARGET_DIR = path.join(BUILD_DIR, `${APP_NAME}_${VERSION}`);

// Ensure production directory exists
if (!fs.existsSync(BUILD_DIR)) {
  fs.mkdirSync(BUILD_DIR);
}

// Check if version already exists
if (fs.existsSync(TARGET_DIR)) {
  console.error(
    `Error: Version ${VERSION} already exists in production folder!`
  );
  console.error("Please update the version number in package.json");
  process.exit(1);
}

try {
  // Create build
  console.log("Building application...");
  execSync("npm run build", { stdio: "inherit" });

  // Create version directory
  fs.mkdirSync(TARGET_DIR);

  // Move build to version directory
  console.log("Moving build to production folder...");
  fs.renameSync(
    path.join(__dirname, "../build"),
    path.join(TARGET_DIR, "build")
  );

  // Create zip file
  console.log("Creating zip archive...");
  execSync(
    `cd "${BUILD_DIR}" && zip -r "${APP_NAME}_${VERSION}.zip" "${APP_NAME}_${VERSION}"`,
    {
      stdio: "inherit",
    }
  );

  console.log(`\nBuild complete! Output: production/${APP_NAME}_${VERSION}`);
  console.log(`Zip file created: production/${APP_NAME}_${VERSION}.zip`);
} catch (error) {
  console.error("Build failed:", error);
  // Cleanup on failure
  if (fs.existsSync(TARGET_DIR)) {
    fs.rmSync(TARGET_DIR, { recursive: true });
  }
  process.exit(1);
}
