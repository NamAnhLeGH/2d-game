// Player movement and animation controls
import { characterScaleFactor } from '../constants';

// Character selection - you can change this to switch characters
export const SELECTED_CHARACTER = 'adam'; // Options: 'adam', 'alex', 'amelia', 'bob'

// Direction mapping for cleaner code - swapped left and right
const DIRECTIONS = {
  left: { angle: [-45, 45], walk: 'walk-right', idle: 'idle-right' },
  up: { angle: [45, 135], walk: 'walk-up', idle: 'idle-up' },
  right: { angle: [135, 180, -180, -135], walk: 'walk-left', idle: 'idle-left' },
  down: { angle: [-135, -45], walk: 'walk-down', idle: 'idle-down' },
} as const;

// Helper function to get direction from angle
const getDirectionFromAngle = (angle: number): keyof typeof DIRECTIONS | null => {
  for (const [direction, config] of Object.entries(DIRECTIONS)) {
    const [min1, max1, min2, max2] = config.angle;
    
    if (min2 !== undefined && max2 !== undefined) {
      // Handle ranges that cross 180/-180 boundary (like right: 135 to 180 and -180 to -135)
      if ((angle >= min1 && angle <= max1) || (angle >= min2 && angle <= max2)) {
        return direction as keyof typeof DIRECTIONS;
      }
    } else {
      // Handle normal ranges
      if (angle >= min1 && angle <= max1) {
        return direction as keyof typeof DIRECTIONS;
      }
    }
  }
  return null;
};

// Helper function to set player animation
const setPlayerAnimation = (k: any, player: any, direction: keyof typeof DIRECTIONS, isWalking: boolean = true) => {
  const character = player.character || 'adam';
  const animType = isWalking ? 'run' : 'idleAnim';
  const animation = DIRECTIONS[direction][isWalking ? 'walk' : 'idle'];
  
  if (player.curAnim() !== animation) {
    player.use(k.sprite(`${character}-${animType}`, { anim: animation }));
  }
  player.direction = direction;
};

export const createPlayer = (k: any, character: string = SELECTED_CHARACTER) => {
  return k.make([
    k.sprite(`${character}-idleAnim`, { anim: "idle-down" }),
    k.area({
      shape: new k.Rect(k.vec2(0, 3), 10, 10),
    }),
    k.body(),
    k.anchor("center"),
    k.pos(),
    k.scale(characterScaleFactor), // Characters are 2x bigger than normal scale
    {
      speed: 200,
      direction: "down",
      isInDialogue: false,
      character: character,
      // Pixel tracking
      pixelsMoved: 0,
      lastPosition: k.vec2(0, 0),
      movementType: "none",
    },
    "player",
  ]);
};

export const setupPlayerControls = (k: any, player: any) => {
  // Initialize pixel tracking
  player.lastPosition = player.pos.clone();
  
  // Pixel tracking every frame - track actual distance moved
  k.onUpdate(() => {
    const currentPos = player.pos;
    const distance = player.lastPosition.dist(currentPos);
    if (distance > 0) { // Only count if actually moved
      player.pixelsMoved += distance;
    }
    player.lastPosition = currentPos.clone();
  });
  
  // Print pixels moved every second
  k.loop(1, () => {
    console.log(`Pixels moved in 1 second: ${player.pixelsMoved.toFixed(2)} (${player.movementType})`);
    player.pixelsMoved = 0; // Reset counter
  });

  // Mouse controls
  k.onMouseDown((mouseBtn: string) => {
    if (mouseBtn !== "left" || player.isInDialogue) return;

    const worldMousePos = k.toWorld(k.mousePos());
    const distance = player.pos.dist(worldMousePos);
    const mouseSpeed = player.speed;
    
    console.log('Mouse movement:', {
      distance: distance.toFixed(2),
      mouseSpeed: mouseSpeed,
      playerSpeed: player.speed,
      diagonalSpeed: player.speed * 0.707
    });
    
    player.movementType = "mouse";
    player.moveTo(worldMousePos, player.speed);

    const mouseAngle = player.pos.angle(worldMousePos);
    const direction = getDirectionFromAngle(mouseAngle);
    
    if (direction) {
      console.log(`Angle: ${mouseAngle.toFixed(1)}° → ${direction.toUpperCase()} → ${DIRECTIONS[direction].walk}`);
      setPlayerAnimation(k, player, direction, true);
    }
  });

  // Animation control - use idle animation based on last movement direction
  const stopAnims = () => {
    const character = player.character || 'adam';
    const direction = player.direction as keyof typeof DIRECTIONS;
    
    if (direction && DIRECTIONS[direction]) {
      setPlayerAnimation(k, player, direction, false);
    } else {
      // Default to down if direction is invalid
      player.use(k.sprite(`${character}-idleAnim`, { anim: "idle-down" }));
    }
  };

  k.onMouseRelease(stopAnims);
  k.onKeyRelease(stopAnims);

  // Keyboard controls with diagonal movement support
  k.onKeyDown(() => {
    const keyMap = [
      k.isKeyDown("right"),
      k.isKeyDown("left"), 
      k.isKeyDown("up"),
      k.isKeyDown("down"),
    ];

    let nbOfKeyPressed = 0;
    for (const key of keyMap) {
      if (key) nbOfKeyPressed++;
    }

    if (nbOfKeyPressed === 0 || player.isInDialogue) return;

    const diagonalSpeed = player.speed * 0.707; // sqrt(2)/2 for proper diagonal speed
    const diagonalSpeedPerAxis = player.speed * 0.707; // Use 0.707 for each axis to get total speed of ~200

    // Debug logging
    console.log('Keys pressed:', {
      right: keyMap[0],
      left: keyMap[1], 
      up: keyMap[2],
      down: keyMap[3],
      playerSpeed: player.speed,
      diagonalSpeedPerAxis: diagonalSpeedPerAxis,
      calculation: `${player.speed} * 0.707 = ${diagonalSpeedPerAxis}`,
      totalDiagonalSpeed: Math.sqrt(diagonalSpeedPerAxis * diagonalSpeedPerAxis + diagonalSpeedPerAxis * diagonalSpeedPerAxis).toFixed(2)
    });

    // Handle diagonal movements first
    if (keyMap[0] && keyMap[2]) {
      // Right + Up = Diagonal up-right
      console.log('Diagonal up-right:', diagonalSpeed, -diagonalSpeed);
      player.movementType = "diagonal-up-right";
      setPlayerAnimation(k, player, 'up', true);
      player.move(k.vec2(diagonalSpeedPerAxis, -diagonalSpeedPerAxis));
      return;
    }
    
    if (keyMap[0] && keyMap[3]) {
      // Right + Down = Diagonal down-right
      console.log('Diagonal down-right:', diagonalSpeed, diagonalSpeed);
      console.log('Expected total speed:', Math.sqrt(diagonalSpeed * diagonalSpeed + diagonalSpeed * diagonalSpeed));
      setPlayerAnimation(k, player, 'down', true);
      player.movementType = "diagonal-down-right";
      player.move(k.vec2(diagonalSpeedPerAxis, diagonalSpeedPerAxis));
      return;
    }
    
    if (keyMap[1] && keyMap[2]) {
      // Left + Up = Diagonal up-left
      console.log('Diagonal up-left:', -diagonalSpeed, -diagonalSpeed);
      setPlayerAnimation(k, player, 'up', true);
      player.movementType = "diagonal-up-left";
      player.move(k.vec2(-diagonalSpeedPerAxis, -diagonalSpeedPerAxis));
      return;
    }
    
    if (keyMap[1] && keyMap[3]) {
      // Left + Down = Diagonal down-left
      console.log('Diagonal down-left:', -diagonalSpeed, diagonalSpeed);
      setPlayerAnimation(k, player, 'down', true);
      player.movementType = "diagonal-down-left";
      player.move(k.vec2(-diagonalSpeedPerAxis, diagonalSpeedPerAxis));
      return;
    }

    // Handle single direction movements
    if (keyMap[0]) {
      // Right direction
      console.log('Right only:', player.speed, 0);
      player.movementType = "right";
      setPlayerAnimation(k, player, 'right', true);
      player.move(player.speed, 0);
      return;
    }

    if (keyMap[1]) {
      // Left direction
      console.log('Left only:', -player.speed, 0);
      player.movementType = "left";
      setPlayerAnimation(k, player, 'left', true);
      player.move(-player.speed, 0);
      return;
    }

    if (keyMap[2]) {
      // Up direction
      console.log('Up only:', 0, -player.speed);
      player.movementType = "up";
      setPlayerAnimation(k, player, 'up', true);
      player.move(0, -player.speed);
      return;
    }

    if (keyMap[3]) {
      // Down direction
      console.log('Down only:', 0, player.speed);
      player.movementType = "down";
      setPlayerAnimation(k, player, 'down', true);
      player.move(0, player.speed);
    }
  });
};