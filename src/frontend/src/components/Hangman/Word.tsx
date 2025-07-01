import { useContext, useState, useEffect, useRef } from "react";
import { GlobalContext, AppState } from "../../context/GlobalState";

const Word = () => {
  const { selectedWord, correctLetters, playable } = useContext(
    GlobalContext
  ) as AppState;
  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input when game starts (playable becomes true)
  useEffect(() => {
    if (playable && inputRef.current) {
      // Small delay to ensure the game has fully rendered
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  }, [playable]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 0) {
      // Process the input (you can add letter guessing logic here)
      console.log("Guessed letter:", value);
      // Clear the input after processing
      setInputValue("");
    }
  };

  const toggleInput = () => {
    setShowInput(!showInput);
    if (!showInput && inputRef.current) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  };

  return (
    <>
      <div className="word">
        {selectedWord &&
          selectedWord.word &&
          selectedWord.word.split("").map((letter, i) => {
            return (
              <span className="letter" key={i}>
                {correctLetters.includes(letter) ? letter : ""}
              </span>
            );
          })}
        {!showInput && (
          <span className="keyboard-icon" style={{ zoom: 2 }} onClick={toggleInput}>
            ⌨️
          </span>
        )}
      </div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Type to guess..."
        className={`mobile-input ${showInput ? 'show' : ''}`}
        value={inputValue}
        onChange={handleInputChange}
        maxLength={1}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
    </>
  );
};

export default Word;
