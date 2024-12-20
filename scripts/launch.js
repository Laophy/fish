const { exec, spawn } = require("child_process");
const steamworks = require("steamworks.js");
const path = require("path");

async function startApp() {
  try {
    // Try to initialize Steam - this will throw if Steam isn't running
    const client = steamworks.init(2940220);
    console.log("Steam is already running");
    // Clean up
    if (client && client.shutdown) {
      client.shutdown();
    }

    // Start the app
    console.log("Starting the app...");
    startElectronApp();
  } catch (error) {
    console.log("Starting Steam...");
    exec("start steam://run/2940220", (error) => {
      if (error) {
        console.error("Failed to start Steam:", error);
        process.exit(1);
      }
      // Wait a moment for Steam to start
      setTimeout(() => {
        startElectronApp();
      }, 3000);
    });
  }
}

function startElectronApp() {
  // Start the renderer
  const renderer = spawn("npm", ["run", "start:renderer"], {
    stdio: "inherit",
    shell: true,
  });

  // Start the main process after a delay to allow the renderer to start
  setTimeout(() => {
    const main = spawn("npm", ["run", "start:main"], {
      stdio: "inherit",
      shell: true,
    });

    main.on("error", (err) => {
      console.error("Failed to start main process:", err);
      process.exit(1);
    });
  }, 2000);

  renderer.on("error", (err) => {
    console.error("Failed to start renderer:", err);
    process.exit(1);
  });
}

startApp();
