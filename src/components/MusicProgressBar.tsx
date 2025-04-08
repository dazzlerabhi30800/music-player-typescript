import { useState } from "react";

const MusicProgressBar = () => {
  const [progressVal, setProgressVal] = useState(30);
  return (
    <div className="progress--bar">
      <input
        style={{ "--background-size": progressVal + "%" }}
        type="range"
        min="0"
        value={progressVal}
        onChange={(e) => setProgressVal(Number(e.target.value))}
        max={100}
      />
      <div className="song--duration--container">
        <p>Current Duration</p>
        <p>Total Duration</p>
      </div>
    </div>
  );
};

export default MusicProgressBar;
