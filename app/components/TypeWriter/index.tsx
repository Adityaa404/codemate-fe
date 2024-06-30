import React, { useState, useEffect } from 'react';

const TypingEffect = ({ parentStyle, text, typingSpeed = 10 }: any) => {
    console.log(text,'TEST');
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Ensure text is always treated as a string
    const validText = String(text);
    if (index < validText.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(prev => prev + validText.charAt(index));
        setIndex(prev => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeoutId);
    }
  }, [index, text, typingSpeed]);

  const styles = {
    typingEffect: {
      display: 'inline-block',
      color: 'black', // Customize text color
      fontSize: '18px', // Customize font size
      fontFamily: 'monospace', // Customize font family
    },
    cursor: {
      display: 'inline-block',
      backgroundColor: 'black',
      marginLeft: '2px',
      width: '2px',
      animation: 'blink 0.7s step-start infinite',
    },
    '@keyframes blink': {
      '50%': {
        opacity: 0,
      },
    },
  };

  return (
    <div style={styles.typingEffect}>
      {displayedText}
      <span style={styles.cursor}>|</span>
    </div>
  );
};

export default TypingEffect;
