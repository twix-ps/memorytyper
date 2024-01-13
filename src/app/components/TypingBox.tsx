"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { WordProps, WordData } from '../types';

const Document: string = "Integer ultrices Integer facilisis diam in cursus.";

function prepareDocument(inputString: string): WordData[] {
    const words = inputString.split(/\s+/);
  
    const wordDataArray: WordData[] = words.map((word, index) => {
      return {
        id: index,
        text: word,
        state: index === 0 ? 'active' : 'awaiting',
      };
    });
    console.log(wordDataArray)
    return wordDataArray;
  }

  const wordsData: WordData[] = [
    ...prepareDocument(Document),
  ];

  function getWord(index: number) {
    return document.querySelector(`#${index}`)
  }

let letters: string[] = [];
let typed: string[] = [];
let currentWordIndex: number = 2;
  
function handleInput(key: string) {
  const currentWord = getWord(currentWordIndex)
  if (currentWord?.textContent) {
  letters = currentWord?.textContent.split('');
  console.log(letters)
}

  if (key === ' ') {
    typed = [];
    pushWord();
    return;
  }
  
  if (key.length === 1 && /[a-zA-Z]/.test(key)) {
    typed.push(key);
    console.log(typed);
  }
  
  console.log(letters);
}

function pushWord() {
    const currentWord = getWord(currentWordIndex);
    letters = [];
      
      const nextWord = getWord(currentWordIndex);
  }



const Word: React.FC<WordProps> = ({ text, state, id, onWordCompletion }) => {
  const [currentState, setState] = useState(state);

  if (state === 'awaiting' || !state) return <p id={id.toString()}>{text}</p>;
  if (state === 'solved') return <p className="green-500" id={id.toString()}>{text}</p>;
  if (state === 'error') return <p className="red-500" id={id.toString()}>{text}</p>;
  
  const letters = state ? text.split("") : [text];

  if (id === currentWordIndex) {
    return (
      <span className={currentState} id={id.toString()}>
        {letters.map((letter, index) => <a key={index}>{letter}</a>)}
      </span>
    );
  } else {
    return <p id={id.toString()}>{text}</p>;
  }
};

const TypingTest: React.FC = () => {
    const [currentWordsData, setCurrentWordsData] = useState<WordData[]>(wordsData);

  
    return (
      <div id="words" className="flex flex-wrap gap-2 max-w-[50vw] h-auto mt-12 select-none">
        {currentWordsData.map((wordData, index) => (
          <Word
            key={index}
            text={wordData.text}
            state={wordData.state}
            id={wordData.id}
            onWordCompletion={pushWord}
          />
        ))}
      </div>
    );
  };

export default function TypingBox() {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
    }
    handleInput(event.key);
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <main id="typing" className="flex items-center justify-center w-screen">
      <TypingTest />
    </main>
  );
}
