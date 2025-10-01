// Asset loading configuration and functions

// Character configuration - cleaner and more organized
const CHARACTERS = ['adam', 'alex', 'amelia', 'bob'] as const;

const CHARACTER_SPRITES = {
  idle: "idle_16x16.png",
  idleAnim: "idle_anim_16x16.png", 
  run: "run_16x16.png",
  phone: "phone_16x16.png",
  sit: "sit_16x16.png",
  sit2: "sit2_16x16.png",
  sit3: "sit3_16x16.png",
} as const;

// Animation configurations
const IDLE_ANIMATIONS = {
  sliceX: 24,
  sliceY: 1,
  anims: {
    "idle-left": { from: 0, to: 5, loop: true, speed: 2 },
    "idle-up": { from: 6, to: 11, loop: true, speed: 2 },
    "idle-right": { from: 12, to: 17, loop: true, speed: 2 },
    "idle-down": { from: 18, to: 23, loop: true, speed: 2 },
  }
};

const RUN_ANIMATIONS = {
  sliceX: 24,
  sliceY: 1,
  anims: {
    "walk-left": { from: 0, to: 5, loop: true, speed: 8 },
    "walk-up": { from: 6, to: 11, loop: true, speed: 8 },
    "walk-right": { from: 12, to: 17, loop: true, speed: 8 },
    "walk-down": { from: 18, to: 23, loop: true, speed: 8 },
  }
};

export const SPRITE_CONFIG = {
  spritesheet: {
    path: "/spritesheet.png",
    sliceX: 39,
    sliceY: 31,
    anims: {
      "idle-down": 936,
      "walk-down": { from: 936, to: 939, loop: true, speed: 8 },
      "idle-side": 975,
      "walk-side": { from: 975, to: 978, loop: true, speed: 8 },
      "idle-up": 1014,
      "walk-up": { from: 1014, to: 1017, loop: true, speed: 8 },
    },
  },
  map: {
    path: "/labroom.png",
  },
};

// Helper function to get character sprite path
const getCharacterSpritePath = (character: string, spriteType: keyof typeof CHARACTER_SPRITES): string => {
  return `/Modern tiles_Free/Characters_free/${character.charAt(0).toUpperCase() + character.slice(1)}_${CHARACTER_SPRITES[spriteType]}`;
};

// Helper function to load character sprites
const loadCharacterSprites = (k: any, character: string) => {
  const sprites = Object.keys(CHARACTER_SPRITES) as Array<keyof typeof CHARACTER_SPRITES>;
  
  sprites.forEach(spriteType => {
    const spriteId = `${character}-${spriteType}`;
    const spritePath = getCharacterSpritePath(character, spriteType);
    
    if (spriteType === 'idleAnim') {
      k.loadSprite(spriteId, spritePath, IDLE_ANIMATIONS);
      console.log(`Loaded idle anim ${spriteId}: ${spritePath}`);
    } else if (spriteType === 'run') {
      k.loadSprite(spriteId, spritePath, RUN_ANIMATIONS);
      console.log(`Loaded run anim ${spriteId}: ${spritePath}`);
    } else {
      k.loadSprite(spriteId, spritePath);
      console.log(`Loaded static ${spriteId}: ${spritePath}`);
    }
  });
};

export const loadAssets = (k: any) => {
  console.log('Loading spritesheet...');
  k.loadSprite("spritesheet", SPRITE_CONFIG.spritesheet.path, {
    sliceX: SPRITE_CONFIG.spritesheet.sliceX,
    sliceY: SPRITE_CONFIG.spritesheet.sliceY,
    anims: SPRITE_CONFIG.spritesheet.anims,
  });

  console.log('Loading character sprites...');
  CHARACTERS.forEach(character => {
    loadCharacterSprites(k, character);
  });

  console.log('Loading map...');
  k.loadSprite("map", SPRITE_CONFIG.map.path);
  
  k.setBackground(k.Color.fromHex("#311047"));
};