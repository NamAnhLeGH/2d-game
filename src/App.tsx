import { useState } from 'react';
import Game from './components/Game';
import Dialogue from './components/Dialogue';
import './App.css';

function App() {
  const [dialogue, setDialogue] = useState<{ text: string; isOpen: boolean }>({
    text: '',
    isOpen: false
  });

  const showDialogue = (text: string) => {
    setDialogue({ text, isOpen: true });
  };

  const closeDialogue = () => {
    setDialogue({ text: '', isOpen: false });
    // Call the Kaboom.js callback if it exists
    if ((window as any).onDialogueClose) {
      (window as any).onDialogueClose();
      (window as any).onDialogueClose = null;
    }
  };

  // Make dialogue function available globally for Kaboom.js
  (window as any).showDialogue = showDialogue;

  return (
    <div className="app">
      <div className="note">
        <p>Tap/Click around to move</p>
      </div>
      
      <Game />
      
      {dialogue.isOpen && (
        <Dialogue text={dialogue.text} onClose={closeDialogue} />
      )}
    </div>
  );
}

export default App;
