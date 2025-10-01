import { useEffect, useRef, useState } from 'react';
import { GameEngine } from '../game';
import { CharacterSelector } from './CharacterSelector';

const Game = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const gameEngineRef = useRef<GameEngine | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState('adam');
  const [showCharacterSelector, setShowCharacterSelector] = useState(true);

  const handleCharacterSelect = (character: string) => {
    setSelectedCharacter(character);
    setShowCharacterSelector(false);
  };

  useEffect(() => {
    if (!gameRef.current || showCharacterSelector) return;

    // Small delay to ensure canvas is rendered
    const initGame = async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Initialize game engine with selected character
      gameEngineRef.current = new GameEngine(selectedCharacter);
      await gameEngineRef.current.initialize();
    };
    
    initGame();

    // Cleanup function
    return () => {
      if (gameEngineRef.current) {
        gameEngineRef.current.destroy();
      }
    };
  }, [selectedCharacter, showCharacterSelector]);

  if (showCharacterSelector) {
    return (
      <div style={{ 
        width: '100%', 
        height: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        background: '#311047',
        color: 'white'
      }}>
        <CharacterSelector 
          onCharacterSelect={handleCharacterSelect}
          selectedCharacter={selectedCharacter}
        />
      </div>
    );
  }

  return (
    <div ref={gameRef} style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <canvas id="game"></canvas>
      <button 
        onClick={() => setShowCharacterSelector(true)}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          padding: '8px 16px',
          background: '#4a4a4a',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Change Character
      </button>
    </div>
  );
};

export default Game;
