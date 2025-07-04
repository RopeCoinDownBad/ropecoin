import { createContext, useReducer, useCallback } from "react";
import AppReducer from "./AppReducer";
import { DictionaryResponse } from "../helpers";

export type AppState = {
  playable: boolean;
  selectedWord: DictionaryResponse;
  correctLetters: string[];
  wrongLetters: string[];
  showNotification: boolean;
};

type AppActions = {
  toggleNotification: () => void;
  setSelectedWord: (selectedWord: DictionaryResponse) => void;
  setCorrectLetters: (letter: string) => void;
  setWrongLetters: (letter: string) => void;
  resetGame: () => void;
  startGame: () => void;
};

type SET_NOTIFICATION = { type: "SET_NOTIFICATION"; payload: boolean };
type RESET_GAME = { type: "RESET_GAME" };
type SET_CORRECT_LETTERS = { type: "SET_CORRECT_LETTERS"; payload: string };
type SET_WRONG_LETTERS = { type: "SET_WRONG_LETTERS"; payload: string };
type SET_SELECTED_WORD = {
  type: "SET_SELECTED_WORD";
  payload: DictionaryResponse;
};
type SET_HINTS = { type: "SET_HINTS"; payload: boolean };
type START_GAME = { type: "START_GAME" };

export type AppContext = AppState & AppActions;

export type AppActionTypes =
  | SET_NOTIFICATION
  | RESET_GAME
  | SET_CORRECT_LETTERS
  | SET_WRONG_LETTERS
  | SET_SELECTED_WORD
  | SET_HINTS
  | START_GAME;

// Initial state
const initialState = {
  playable: false,
  selectedWord: {
    word: "",
    definition: "",
  },
  correctLetters: [],
  wrongLetters: [],
  showNotification: false,
  showHints: false,
} as AppState;

// Create context
export const GlobalContext = createContext<AppContext | null>(null);

// Provider component
export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const toggleNotification = useCallback(() => {
    dispatch({
      type: "SET_NOTIFICATION",
      payload: true,
    });
    setTimeout(() => {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: false,
      });
    }, 2000);
  }, []);

  const resetGame = () => {
    dispatch({
      type: "RESET_GAME",
    });
  };

  const setSelectedWord = (selectedWord: DictionaryResponse) => {
    dispatch({
      type: "SET_SELECTED_WORD",
      payload: selectedWord,
    });
  };

  const setCorrectLetters = (letter: string) => {
    dispatch({
      type: "SET_CORRECT_LETTERS",
      payload: letter,
    });
  };

  const setWrongLetters = (letter: string) => {
    dispatch({
      type: "SET_WRONG_LETTERS",
      payload: letter,
    });
  };

  const startGame = () => {
    dispatch({
      type: "START_GAME",
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        playable: state.playable,
        correctLetters: state.correctLetters,
        wrongLetters: state.wrongLetters,
        showNotification: state.showNotification,
        selectedWord: state.selectedWord,
        toggleNotification,
        setSelectedWord,
        setCorrectLetters,
        setWrongLetters,
        resetGame,
        startGame,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
