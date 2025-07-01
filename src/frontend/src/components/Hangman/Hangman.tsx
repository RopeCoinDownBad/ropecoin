import Figure from "./Figure";
import WrongLetters from "./WrongLetters";
import Word from "./Word";
import Popup from "./PopUp";
import Notification from "./Notification";
import PlayButton from "./PlayButton";
import "./Hangman.css";

import GetRandomWord from "../../hooks/getRandomWord";
import HandleKeyDown from "../../hooks/handleKeyDown";
import { useContext } from "react";
import { GlobalContext, AppContext } from "../../context/GlobalState";

const Game = () => {
  const { playable, selectedWord } = useContext(GlobalContext) as AppContext;
  
  GetRandomWord();
  HandleKeyDown();

  if (!playable || !selectedWord.word) {
    return (
      <div className="game-container">
        <PlayButton />
      </div>
    );
  }

  return (
    <>
      <div className="game-container">
        <Figure />
        <WrongLetters />
        <Word />
        <Notification />
      </div>
        <Popup />
    </>
  );
};

export default Game;
