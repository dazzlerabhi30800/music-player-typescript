import { useMusicContext } from "../lib/store/Store";
import MusicComp from "./MusicComp";

const MusicWrapper = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  const { musicData } = useMusicContext();
  return (
    <div className="music--wrapper">
      <h1>Title</h1>
      {/* Form Search */}
      <form onSubmit={handleSubmit} className="music--search">
        <input
          placeholder="Search Music, Artist"
          type="text"
          className="musicInput"
        />
        <span>
          <i className="bi bi-search"></i>
        </span>
      </form>
      {/* MusicWrapper */}
      <div className="music--container">
        {musicData?.map((item, index) => (
          <MusicComp item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default MusicWrapper;
