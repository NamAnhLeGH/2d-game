// Main game engine that orchestrates all game systems
import { initKaboom } from '../kaboomCtx';
import { loadAssets } from './assetLoader';
import { createPlayer, setupPlayerControls } from './playerController';
import { loadMap, setupCollisions } from './mapLoader';
import { setupCamera } from './cameraController';

export class GameEngine {
  private k: any = null;
  private player: any = null;
  private map: any = null;

  async initialize() {
    console.log('Initializing game engine...');
    
    // Initialize Kaboom
    this.k = initKaboom();
    console.log('Kaboom initialized:', this.k);

    // Load assets
    loadAssets(this.k);

    // Create main scene
    this.k.scene("main", async () => {
      await this.createMainScene();
    });

    // Start the game
    this.k.go("main");
  }

  private async createMainScene() {
    console.log('Creating main scene...');
    
    // Load map and get layers
    const { map, layers } = await loadMap(this.k);
    this.map = map;

    // Create player
    this.player = createPlayer(this.k);
    console.log('Player created:', this.player);

    // Setup collisions
    setupCollisions(this.k, this.map, this.player, layers);

    // Setup player controls
    setupPlayerControls(this.k, this.player);

    // Setup camera
    setupCamera(this.k, this.player);
  }

  destroy() {
    if (this.k) {
      this.k.destroyAll();
    }
  }
}
