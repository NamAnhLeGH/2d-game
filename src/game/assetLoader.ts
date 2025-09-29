// Asset loading configuration and functions
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
    path: "/map.png",
  },
};

export const loadAssets = (k: any) => {
  console.log('Loading spritesheet...');
  k.loadSprite("spritesheet", SPRITE_CONFIG.spritesheet.path, {
    sliceX: SPRITE_CONFIG.spritesheet.sliceX,
    sliceY: SPRITE_CONFIG.spritesheet.sliceY,
    anims: SPRITE_CONFIG.spritesheet.anims,
  });

  console.log('Loading map...');
  k.loadSprite("map", SPRITE_CONFIG.map.path);
  
  k.setBackground(k.Color.fromHex("#311047"));
};
