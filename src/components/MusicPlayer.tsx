import { ActionPickerFav, ActionPickerVolume } from "./ActionPicker";
import ButtonComp from "./ButtonComp";
import MusicProgressBar from "./MusicProgressBar";

const MusicPlayer = () => {
  return (
    <div className="music--player">
      <div className="music--container">
        <div className="song--header">
          <h3>Song Name</h3>
          <p>Artist Name</p>
        </div>
        {/* Player */}
        <div className="player--wrapper">
          <img src="./profile-img.png" alt="" />
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
                onClick={() => console.log("hello")}
                buttonClass="control--btn play--btn"
                iconClass="bi bi-play-fill"
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
