import { formatDuration } from "../lib/utils/formatDuration";
import { musicItem } from "../vite-env";

interface musicProps {
  item: musicItem;
}

const MusicComp = ({ item }: musicProps) => {
  return (
    <div className="music--comp">
      <div className="music--info">
        <img src={item.thumbnail} alt={item.title} className="music--art" />
        <div className="music--detail">
          <h2>{item.title}</h2>
          <p>{item.artistName}</p>
        </div>
      </div>
      <p>{formatDuration(item.duration)}</p>
    </div>
  );
};

export default MusicComp;
