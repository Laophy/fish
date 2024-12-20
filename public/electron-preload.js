const { ipcRenderer, contextBridge } = require("electron");
const path = require("path");

// Keep the existing API methods separate
contextBridge.exposeInMainWorld("electronAPI", {
  link: (link) => {
    let event = ipcRenderer.send("link", link);
    return () => event.removeListener("link");
  },
  toggle_fullscreen: () => {
    let event = ipcRenderer.send("toggle_fullscreen");
    return () => event.removeListener("toggle_fullscreen");
  },
  quit: () => {
    let event = ipcRenderer.send("quit");
    return () => event.removeListener("quit");
  },
});

contextBridge.exposeInMainWorld("electron", {
  getAssetPath: (assetPath) => {
    if (process.env.NODE_ENV === "development") {
      return `/${assetPath}`; // Development path
    }

    // In production, try multiple possible paths
    const possiblePaths = [
      path.join(process.resourcesPath, "app", "build", assetPath),
      path.join(__dirname, "..", assetPath),
      path.join(__dirname, assetPath),
    ];

    // Log the paths we're trying
    console.log("Trying paths:", possiblePaths);

    // Return the first path that exists
    for (const p of possiblePaths) {
      if (require("fs").existsSync(p)) {
        console.log("Found audio at:", p);
        return p;
      }
    }

    // If no path works, return the first one and let it fail naturally
    console.error("No valid audio path found");
    return possiblePaths[0];
  },
});
