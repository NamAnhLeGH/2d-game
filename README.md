# 2D Portfolio Game - React TypeScript Version

This is a React TypeScript conversion of the original Kaboom.js 2D portfolio game. The game allows visitors to explore a virtual room and learn about the developer by clicking on different interactive objects.

## Features

- **Interactive 2D Environment**: Navigate through a virtual room using mouse clicks or keyboard controls
- **Player Character**: Animated character with walking/idle animations in 4 directions
- **Interactive Objects**: Click on various objects (PC, bed, TV, etc.) to learn about the developer
- **Dialogue System**: Typewriter-effect dialogue boxes with HTML content support
- **Responsive Design**: Works on both desktop and mobile devices

## Technology Stack

- **React 19** with TypeScript
- **Kaboom.js** for 2D game engine
- **Vite** for build tooling
- **CSS3** for styling and animations

## Project Structure

```
src/
├── components/
│   ├── Game.tsx          # Main game component with Kaboom.js integration
│   └── Dialogue.tsx      # React dialogue component
├── constants.ts          # Game constants and dialogue data
├── utils.ts             # Utility functions
├── kaboomCtx.ts         # Kaboom.js initialization
├── App.tsx              # Main app component
├── App.css              # Game-specific styles
└── index.css            # Global styles
```

## Key Components

### Game.tsx
- Initializes Kaboom.js game engine
- Loads sprites and map data
- Handles player movement and animations
- Manages collision detection and dialogue triggers

### Dialogue.tsx
- React component for displaying interactive dialogue
- Typewriter effect for text animation
- Keyboard support (Enter to close)
- HTML content support for links

### Constants & Utils
- **constants.ts**: Game configuration and dialogue content
- **utils.ts**: Bridge between Kaboom.js and React dialogue system
- **kaboomCtx.ts**: Kaboom.js engine setup

## How It Works

1. **Game Initialization**: Kaboom.js loads the game assets and creates the main scene
2. **Map System**: Reads map data from `map.json` and creates collision boundaries
3. **Player Controls**: Supports both mouse/touch and keyboard movement
4. **Interaction System**: When player collides with named objects, React dialogue appears
5. **Dialogue Display**: React component handles the typewriter effect and user interaction

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Assets

The game uses the following assets (copied from the original project):
- `spritesheet.png` - Character and object sprites
- `map.png` - Background map image
- `map.json` - Map data with collision boundaries and spawn points
- `monogram.ttf` - Custom font for UI elements

## Conversion Notes

This React version maintains the same functionality as the original Kaboom.js project while adding:
- TypeScript type safety
- React component architecture
- Better separation of concerns
- Modern development tooling

The dialogue system has been converted from vanilla JavaScript DOM manipulation to React components, providing better state management and user experience.