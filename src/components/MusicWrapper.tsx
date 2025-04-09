import { useState } from "react";
import { useMusicContext } from "../lib/store/Store";
import MusicComp from "./MusicComp";

const MusicWrapper = () => {
  const { tab, title, data, showNav, setShowNav } = useMusicContext();
  const [searchString, setSearchString] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  const itemData = data[tab].filter((item) =>
    item.title.toLowerCase().includes(searchString.toLowerCase())
  );
  return (
    <div className={`music--wrapper ${showNav && "show"}`}>
      <h1>{title}</h1>
      {/* Form Search */}
      <form onSubmit={handleSubmit} className="music--search">
        <input
          placeholder="Search Music, Artist"
          type="text"
          className="musicInput"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
        <span>
          <i className="bi bi-search"></i>
        </span>
      </form>
      {/* MusicWrapper */}
      {!itemData.length && (
        <div className="empty--list">
          <p>There are no tracks to show</p>
        </div>
      )}
      {itemData.length > 0 && (
        <div className="music--container">
          {itemData?.map((item, index) => (
            <MusicComp item={item} key={index} />
          ))}
        </div>
      )}
      <button className="menu--btn" onClick={() => setShowNav(false)}>
        <i className="bi bi-x-lg"></i>
      </button>
    </div>
  );
};

export default MusicWrapper;
