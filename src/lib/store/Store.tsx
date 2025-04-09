import { createContext, useContext, useRef, useState } from "react";
import { songData } from "../../data/musicData";
import { musicItem } from "../../vite-env";

interface context {
  musicData: musicItem[];
  currSong: musicItem;
  setCurrSong: React.Dispatch<React.SetStateAction<musicItem>>;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  audioRef: React.RefObject<HTMLAudioElement> | null;
  playerRef: React.RefObject<boolean> | null;
  totalDuration: number;
  setTotalDuration: React.Dispatch<React.SetStateAction<number>>;

  progressVal: string;
  setProgressVal: React.Dispatch<React.SetStateAction<string>>;
}

const context = createContext<context>({
  musicData: [],
  currSong: songData[0],
  setCurrSong: (currSong) => currSong,
  duration: 0,
  setDuration: (duration) => duration,
  audioRef: null,
  playerRef: null,
  totalDuration: 0,
  setTotalDuration: (duration) => duration,
  progressVal: "0%",
  setProgressVal: (progressVal) => progressVal,
});

export default function MusicContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [musicData, _] = useState<musicItem[]>(songData);
  const [currSong, setCurrSong] = useState<musicItem>(musicData[0]);
  const [duration, setDuration] = useState(0);
  const [totalDuration, setTotalDuration] = useState(currSong.duration);
  const [progressVal, setProgressVal] = useState("0%");

  const audioRef = useRef<HTMLAudioElement>(new Audio(currSong.musicUrl));
  const playerRef = useRef(false);
  return (
    <context.Provider
      value={{
        musicData,
        currSong,
        setCurrSong,
        duration,
        setDuration,
        audioRef,
        totalDuration,
        setTotalDuration,
        playerRef,
        progressVal,
        setProgressVal,
      }}
    >
      {children}
    </context.Provider>
  );
}

export const useMusicContext = () => {
  const musicContext = useContext(context);
  if (!musicContext) {
    throw new Error("Music context is not wrapped");
  }
  return musicContext;
};
