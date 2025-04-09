import { useMusicContext } from "../lib/store/Store";
import { formatDuration } from "../lib/utils/formatDuration";

const MusicProgressBar = () => {
  const {
    currSong,
    duration,
    setDuration,
    progressVal,
    setProgressVal,
    audioRef,
  } = useMusicContext();
  const handleProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!audioRef?.current) return;
    audioRef.current.currentTime = Number(e.target.value);
    const actualDuration = (Number(e.target.value) / currSong.duration) * 100;
    setDuration(Number(e.target.value));
    setProgressVal(actualDuration + "%");
  };
  return (
    <div className="progress--bar">
      <input
        style={{ "--background-size": progressVal }}
        type="range"
        onInput={handleProgress}
        min="0"
        value={duration}
        max={currSong.duration}
      />
      <div className="song--duration--container">
        <p>{formatDuration(duration)}</p>
        <p>{formatDuration(currSong.duration)}</p>
      </div>
    </div>
  );
};

export default MusicProgressBar;
