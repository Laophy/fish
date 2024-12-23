# Fish Clicker Game

A fun incremental clicker game where you click fish to earn points, with various bonus mechanics and special fish types.

## Features

- Main clickable fish that changes appearance every minute
- Multiple types of bonus fish:
  - Regular bonus fish that give percentage-based rewards
  - Golden fish with larger percentage-based bonuses
  - Clicker fish that give temporary click multipliers
- Dark/Light theme support
- Sound effects with toggleable audio
- Persistent progress saving
- Play time tracking
- Animated click feedback
- Responsive design

## Game Mechanics

### Main Fish
- Click the central fish to earn points
- Fish appearance changes every minute

### Bonus Fish Types
1. **Regular Bonus Fish**
   - Falls from the sky every 10 seconds
   - Gives 10% of your current score as bonus

2. **Golden Fish**
   - Appears every 30 seconds
   - Provides 20-50% of your current score as bonus
   - Features special golden animations

3. **Clicker Fish**
   - Spawns every minute
   - Grants 1-100 bonus clicks per click for 25 seconds
   - Appears with green glow effect

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

## Installation

[Installation steps would go here - need package.json to provide accurate steps]

## Development

[Development setup instructions would go here - need package.json to provide accurate commands]

## Technologies Used

- React
- Framer Motion for animations
- Electron for desktop app
- Steam integration
- Local storage for progress saving
- React Hot Toast for notifications

## License

[License information would go here]

Builds are created in the `production` folder:
- Production: `fish_VERSION.zip`
- Demo: `fish_VERSION_demo.zip`

You'll be prompted for confirmation if a build with the same version exists.
