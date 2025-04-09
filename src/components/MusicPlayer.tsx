import { useEffect, useState } from "react";
import { useMusicContext } from "../lib/store/Store";
import { ActionPickerFav, ActionPickerVolume } from "./ActionPicker";
import ButtonComp from "./ButtonComp";
import MusicProgressBar from "./MusicProgressBar";

const MusicPlayer = () => {
  const {
    currSong,
    audioRef,
    playerRef,
    setTotalDuration,
    setProgressVal,
    setDuration,
  } = useMusicContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const handleDuration = () => {
    setTotalDuration(Math.floor(audioRef?.current?.duration!));
    // yet to implement this functionality
    // if (playerRef?.current) {};
  };

  const handleTimeUpdate = () => {
    const currTime = Math.floor(audioRef?.current.currentTime!);
    const totalTime = (currTime / currSong.duration) * 100;
    setDuration(currTime);
    setProgressVal(totalTime + "%");
  };

  useEffect(() => {
    audioRef?.current?.addEventListener("loadedmetadata", handleDuration);
    audioRef?.current?.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audioRef?.current?.removeEventListener("loadedmetadata", handleDuration);
      audioRef?.current?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      audioRef?.current.pause();
      return;
    }
    audioRef?.current.play();
  }, [isPlaying]);

  return (
    <div className="music--player">
      <div className="music--container">
        <div className="song--header">
          <h3>Song Name</h3>
          <p>Artist Name</p>
        </div>
        {/* Player */}
        <div className="player--wrapper">
          <img src={currSong.thumbnail} alt={currSong.title} />
          <MusicProgressBar />
          <div className="song--controls">
            <ActionPickerFav />
            <div className="song--playback">
              <ButtonComp
                onClick={() => console.log("hello")}
                buttonClass="control--btn"
                iconClass="bi bi-rewind-fill"
              />

              <ButtonComp
                onClick={() => setIsPlaying((prev) => !prev)}
                buttonClass="control--btn play--btn"
                iconClass={isPlaying ? "big bi-pause-fill" : "bi bi-play-fill"}
              />

              <ButtonComp
                onClick={() => console.log("hello")}
                buttonClass="control--btn"
                iconClass="bi bi-fast-forward-fill"
              />
            </div>

            <ActionPickerVolume />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
