import { useCallback, useContext, useEffect, useState } from "react";
import { GlobalContext, AppContext } from "../context/GlobalState";
import { formatDictionaryResponse } from "../helpers";
import { useRopecoinActor } from "./useCanister";

const GetRandomWord = () => {
  const { setSelectedWord, playable } = useContext(GlobalContext) as AppContext;
  const [currentWord, setCurrentWord] = useState<string>("");
  const ropecoinCanister = useRopecoinActor();

  const fetchRandomWord = useCallback(async () => {
    if (playable) {
      try {
        const words = await ropecoinCanister.get_words();
        const randomWord = words[Math.floor(Math.random() * words.length)];
        setCurrentWord(randomWord);
      } catch (error) {
        console.error("Error fetching random word:", error);
      }
    }
  }, [playable]);

  const checkWordinDictionary = useCallback(async () => {
    if (!currentWord) return;

    try {
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${currentWord}`;
      const data = await fetch(url);
      const json = await data.json();
      const formatted = formatDictionaryResponse(json);
      setSelectedWord(formatted);
    } catch (error) {
      console.error("Error checking word in dictionary:", error);
    }
  }, [currentWord, setSelectedWord]);

  useEffect(() => {
    if (playable) {
      fetchRandomWord();
    }
  }, [playable, fetchRandomWord]);

  useEffect(() => {
    if (currentWord) {
      checkWordinDictionary();
    }
  }, [currentWord, checkWordinDictionary]);
};

export default GetRandomWord;
