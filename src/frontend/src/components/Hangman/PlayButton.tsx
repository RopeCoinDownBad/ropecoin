import { useContext } from "react";
import { GlobalContext, AppContext } from "../../context/GlobalState";

const PlayButton = () => {
  const { startGame } = useContext(GlobalContext) as AppContext;

  return (
    <div className="play-button-container">
      <button className="play-button" onClick={startGame}>
        Start Game
      </button>
    </div>
  );
};

export default PlayButton; 