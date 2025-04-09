import { useEffect, useRef, useState } from "react";
import { useMusicContext } from "../lib/store/Store";

export const ActionPickerFav = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { favData, handleFav, currSong } = useMusicContext();
  const [showAction, setShowAction] = useState(false);
  const isFav = favData.findIndex((item) => item.id === currSong.id);
  return (
    <div ref={ref} className="action--wrapper">
      <button
        onClick={() => setShowAction((prev) => !prev)}
        className="action--btn"
      >
        <i className="bi bi-three-dots"></i>
      </button>
      {showAction && (
        <button
          onClick={() => handleFav(isFav >= 0 ? true : false)}
          className={`favorite--btn ${isFav >= 0 && "favorite"}`}
        >
          <i className="bi bi-heart-fill"></i>
        </button>
      )}
    </div>
  );
};

export const ActionPickerVolume = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [showAction, setShowAction] = useState(false);
  const [volume, setVolume] = useState(50);
  const { audioRef } = useMusicContext();

  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setShowAction(false);
    }
  };
  useEffect(() => {
    if (!audioRef?.current) return;
    audioRef.current.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div ref={ref} className="action--wrapper">
      <button
        onClick={() => setShowAction((prev) => !prev)}
        className="action--btn"
      >
        <i className="bi bi-volume-up"></i>
      </button>
      {showAction && (
        <div className="volume--btn">
          <input
            onChange={(e) => setVolume(Number(e.target.value))}
            type="range"
            value={volume}
            min="1"
            max="100"
          />
        </div>
      )}
    </div>
  );
};
