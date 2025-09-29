import { useEffect, useRef } from 'react';
import { GameEngine } from '../game';

const Game = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const gameEngineRef = useRef<GameEngine | null>(null);

  useEffect(() => {
    if (!gameRef.current) return;

    // Small delay to ensure canvas is rendered
    const initGame = async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Initialize game engine
      gameEngineRef.current = new GameEngine();
      await gameEngineRef.current.initialize();
    };
    
    initGame();

    // Cleanup function
    return () => {
      if (gameEngineRef.current) {
        gameEngineRef.current.destroy();
      }
    };
  }, []);

  return (
    <div ref={gameRef} style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <canvas 
        id="game" 
        // style={{ 
        //   width: '100%', 
        //   height: '100%', 
        //   display: 'block',
        //   background: '#311047'
        // }}
      ></canvas>
    </div>
  );
};

export default Game;
