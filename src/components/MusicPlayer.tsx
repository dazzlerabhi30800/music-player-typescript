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
    setLoading,
    loading,
    nextIndex,
    prevIndex,
    handleRecent,
    title,
  } = useMusicContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const handleDuration = () => {
    setTotalDuration(Math.floor(audioRef?.current?.duration!));
    if (!playerRef?.current) return;
    audioRef?.current.play();
    setIsPlaying(true);
    setLoading(false);
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
    if (!playerRef?.current) return;
    if (!audioRef?.current) return;
    setLoading(true);
    audioRef.current.src = currSong.musicUrl;
    handleRecent(currSong.id);
  }, [currSong]);

  const handlePlaying = () => {
    if (!isPlaying && !loading) {
      audioRef?.current.play();
      setIsPlaying(true);
      handleRecent(currSong.id);
    } else {
      audioRef?.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="music--player">
      <div className="music--container">
        <div className="song--header">
          <h3>{currSong.title}</h3>
          <p>{currSong.artistName}</p>
        </div>
        {/* Player */}
        <div className="player--wrapper">
          <img src={currSong.thumbnail} alt={currSong.title} />
          <MusicProgressBar />
          <div className="song--controls">
            <ActionPickerFav />
            <div className="song--playback">
              <ButtonComp
                onClick={prevIndex}
                buttonClass="control--btn"
                iconClass="bi bi-rewind-fill"
              />

              <ButtonComp
                onClick={handlePlaying}
                buttonClass="control--btn play--btn"
                iconClass={
                  loading
                    ? "bi bi-arrow-clockwise spin"
                    : isPlaying
                    ? "big bi-pause-fill"
                    : "bi bi-play-fill"
                }
              />

              <ButtonComp
                onClick={nextIndex}
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
