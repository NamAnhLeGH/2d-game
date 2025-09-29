import { useEffect, useState } from 'react';

interface DialogueProps {
  text: string;
  onClose: () => void;
}

const Dialogue: React.FC<DialogueProps> = ({ text, onClose }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 1);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Enter') {
        onClose();
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  }, [onClose]);

  return (
    <div id="textbox-container" style={{ display: 'block' }}>
      <div id="textbox">
        <p 
          id="dialogue" 
          className="ui-text"
          dangerouslySetInnerHTML={{ __html: displayText }}
        />
        <div className="btn-container">
          <button id="close" className="ui-close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialogue;
