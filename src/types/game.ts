// Game type definitions
export interface PlayerState {
  speed: number;
  direction: 'up' | 'down' | 'left' | 'right';
  isInDialogue: boolean;
}

export interface MapLayer {
  name: string;
  objects: MapObject[];
}

export interface MapObject {
  id: number;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  type: string;
  visible: boolean;
}

export interface SpriteConfig {
  path: string;
  sliceX?: number;
  sliceY?: number;
  anims?: Record<string, any>;
}

export interface GameAssets {
  spritesheet: SpriteConfig;
  map: SpriteConfig;
}
