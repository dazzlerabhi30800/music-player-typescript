import { useMusicContext } from "../lib/store/Store";
import { formatDuration } from "../lib/utils/formatDuration";
import { musicItem } from "../vite-env";

interface musicProps {
  item: musicItem;
}

const MusicComp = ({ item }: musicProps) => {
  const { setCurrSong, currSong, playerRef } = useMusicContext();
  const handleChangeMusic = (item: musicItem) => {
    if (!item) return;
    if (playerRef?.current === null) {
      console.log("hello");
      playerRef.current = true;
    }
    setCurrSong(item);
  };
  return (
    <div
      onClick={() => handleChangeMusic(item)}
      className={`music--comp ${currSong.id === item.id && "active"}`}
    >
      <div className="music--info">
        <img src={item.thumbnail} alt={item.title} className="music--art" />
        <div className="music--detail">
          <h2>{item.title}</h2>
          <p>{item.artistName}</p>
        </div>
      </div>
      <p className="duration">{formatDuration(item.duration)}</p>
    </div>
  );
};

export default MusicComp;
