# Game Architecture

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Game.tsx         # Main game component
│   └── Dialogue.tsx     # Dialogue UI component
├── game/                # Game engine modules
│   ├── index.ts         # Game module exports
│   ├── gameEngine.ts    # Main game orchestrator
│   ├── assetLoader.ts   # Asset loading and configuration
│   ├── playerController.ts # Player movement and controls
│   ├── mapLoader.ts     # Map loading and collision setup
│   └── cameraController.ts # Camera and viewport management
├── types/               # TypeScript type definitions
│   └── game.ts         # Game-related types
├── constants.ts         # Game constants and dialogue data
├── utils.ts            # Utility functions
├── kaboomCtx.ts        # Kaboom.js initialization
├── App.tsx             # Main app component
└── App.css             # Game-specific styles
```

## 🎮 Game Engine Architecture

### **GameEngine Class**
- **Purpose**: Main orchestrator that manages all game systems
- **Responsibilities**: 
  - Initialize Kaboom.js
  - Coordinate between different game modules
  - Manage game lifecycle

### **Asset Loader**
- **Purpose**: Handle loading of sprites and assets
- **Features**:
  - Centralized sprite configuration
  - Animation definitions
  - Asset path management

### **Player Controller**
- **Purpose**: Handle player movement and animations
- **Features**:
  - Mouse and keyboard controls
  - Animation state management
  - Movement physics

### **Map Loader**
- **Purpose**: Load and setup game world
- **Features**:
  - Map data parsing
  - Collision boundary setup
  - Interactive object placement

### **Camera Controller**
- **Purpose**: Manage camera and viewport
- **Features**:
  - Camera following
  - Responsive scaling
  - Viewport management

## 🔧 Key Improvements

### **Modularity**
- Each system is in its own module
- Clear separation of concerns
- Easy to test and maintain

### **TypeScript Support**
- Proper type definitions
- Better IDE support
- Compile-time error checking

### **Scalability**
- Easy to add new features
- Modular architecture
- Clean interfaces between systems

### **Maintainability**
- Single responsibility principle
- Clear naming conventions
- Well-documented code

## 🎯 Usage

```typescript
// Initialize game
const gameEngine = new GameEngine();
await gameEngine.initialize();

// Cleanup
gameEngine.destroy();
```

## 📊 Benefits

1. **Better Organization**: Code is logically separated
2. **Easier Debugging**: Issues are isolated to specific modules
3. **Reusability**: Modules can be reused in other projects
4. **Team Development**: Multiple developers can work on different modules
5. **Testing**: Each module can be tested independently
