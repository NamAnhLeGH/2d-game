// Character selection component
import React, { useState } from 'react';

interface CharacterSelectorProps {
  onCharacterSelect: (character: string) => void;
  selectedCharacter: string;
}

const characters = [
  { id: 'adam', name: 'Adam', description: 'Tech enthusiast' },
  { id: 'alex', name: 'Alex', description: 'Creative developer' },
  { id: 'amelia', name: 'Amelia', description: 'Design specialist' },
  { id: 'bob', name: 'Bob', description: 'Code architect' },
];

export const CharacterSelector: React.FC<CharacterSelectorProps> = ({
  onCharacterSelect,
  selectedCharacter,
}) => {
  return (
    <div className="character-selector">
      <h3>Choose Your Character</h3>
      <div className="character-grid">
        {characters.map((character) => (
          <button
            key={character.id}
            className={`character-option ${
              selectedCharacter === character.id ? 'selected' : ''
            }`}
            onClick={() => onCharacterSelect(character.id)}
          >
            <div className="character-preview">
              <img
                src={`/Modern tiles_Free/Characters_free/${character.name}_idle_16x16.png`}
                alt={character.name}
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  imageRendering: 'pixelated',
                  objectFit: 'none',
                  objectPosition: '-48px 0' // Show 4th frame (frame 3 of 4) - face down
                }}
              />
            </div>
            <div className="character-info">
              <h4>{character.name}</h4>
              <p>{character.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
