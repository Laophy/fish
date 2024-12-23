# Fish

An addictive idle/clicker game where you catch fish, build combos, and discover rare specimens. Manage your upgrades wisely and watch out for cursed fish!

## Features

- Click to catch fish and build powerful combos
- Multiple special fish types:
  - Golden Fish: Percentage-based bonuses from your total catch
  - Clicker Fish: Temporary click multipliers
  - Frenzy Fish: Triggers rapid fish spawning mode
  - Curse Fish: Removes active bonuses - catch with caution!
- Extensive upgrade system:
  - Click Power: Increase base catch rate
  - Multiplier: Enhance all earnings
  - Super Net: Add bonus fish per click
  - Auto-Clicker: Automate your fishing
  - Fish Magnet: Keep special fish around longer
  - Lucky Fisher: Increase special fish spawns
  - Combo Master: Extend your combo duration
- Dark/Light theme with smooth transitions
- Sound effects with toggle control
- Fish collection system
- Achievement tracking
- Persistent progress saving
- Play time tracking
- Animated click feedback
- Steam integration

## Installation

## Running Locally

### Prerequisites

- Node.js (v16 or higher)
- npm (comes with Node.js)
- Git

### Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/fish.git
cd fish
```

2. Install dependencies
```bash
npm install
```

3. Create a steam_appid.txt file in the root directory
```bash
echo "480" > steam_appid.txt
```

### Running the Game

#### Development Mode
```bash
# Start the game in development mode
npm start

# Start the demo version
npm run start:demo
```

#### Production Testing
```bash
# Build and package the full version
npm run build:prod

# Build and package the demo version
npm run build:demo:prod
```

### Common Issues

1. **Steam Integration**
   - Make sure Steam is running
   - Ensure steam_appid.txt is present
   - Steam overlay requires running as a packaged app

2. **Build Issues**
   - Run `npm run clean` to clear build folders
   - Ensure all dependencies are installed
   - Check Node.js version compatibility

### Development Tips

- Use the demo mode for testing features without affecting your main save
- Hot reloading is enabled in development mode
- Check the console (Ctrl+Shift+I) for debugging
- Use `localStorage.clear()` in the console to reset progress


### Building

#### Production Builds

Builds are created in the `production` folder:
- Production: `fish_VERSION.zip`
- Demo: `fish_VERSION_demo.zip`

You'll be prompted for confirmation if a build with the same version exists.

## Game Mechanics

### Fish Types
- **Regular Fish**: Base clicking rewards
- **Golden Fish**: Large percentage-based bonuses
- **Clicker Fish**: Adds bonus clicks per click for 25 seconds
- **Frenzy Fish**: Activates rapid spawn mode for all fish types
- **Curse Fish**: Removes all active bonuses (avoid during frenzy!)

### Combo System
- Chain clicks to build combo multipliers
- Combo timer resets after brief click pauses
- Combo Master upgrade extends timer duration
- Maximum 2x combo multiplier

### Frenzy Mode
- Triggered by catching Frenzy Fish
- All fish spawn much faster
- Extended by catching additional Frenzy Fish
- Becomes increasingly dangerous over time
- Curse Fish spawn rate increases after 15 seconds

### Upgrades
- **Click Power**: Base fish per click
- **Multiplier**: Global earning multiplier
- **Super Net**: Additional fish per click
- **Auto-Clicker**: Automatic clicks per second
- **Fish Magnet**: Extends special fish duration
- **Lucky Fisher**: Boosts special fish spawn rates
- **Combo Master**: Lengthens combo timer

## Technologies

- React
- Electron
- Framer Motion
- Steam SDK Integration
- React Hot Toast
- Local Storage

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Third-Party Licenses

This project makes use of several third-party libraries and tools, each of which is subject to its own license terms. Below is a list of some of the key third-party dependencies and their respective licenses:

- **React**: [MIT License](https://github.com/facebook/react/blob/main/LICENSE)
- **Electron**: [MIT License](https://github.com/electron/electron/blob/main/LICENSE)
- **Framer Motion**: [MIT License](https://github.com/framer/motion/blob/main/LICENSE)
- **Steamworks.js**: [MIT License](https://github.com/greenheartgames/greenworks/blob/master/LICENSE)
- **Archiver**: [MIT License](https://github.com/archiverjs/node-archiver/blob/master/LICENSE)
- **Ant Design**: [MIT License](https://github.com/ant-design/ant-design/blob/master/LICENSE)

For a complete list of dependencies and their licenses, please refer to the `package.json` file.
