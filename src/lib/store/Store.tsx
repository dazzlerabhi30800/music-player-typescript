import { createContext, useContext, useEffect, useRef, useState } from "react";
import { songData } from "../../data/musicData";
import { musicItem } from "../../vite-env";

interface data {
  [key: string]: musicItem[];
}

interface context {
  musicData: musicItem[];
  currSong: musicItem;
  duration: number;
  totalDuration: number;
  progressVal: string;
  loading: boolean;
  title: string;
  tab: string;
  favData: musicItem[];
  recentData: musicItem[];
  showNav: boolean;
  setCurrSong: React.Dispatch<React.SetStateAction<musicItem>>;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  setTotalDuration: React.Dispatch<React.SetStateAction<number>>;
  setProgressVal: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setTab: React.Dispatch<React.SetStateAction<string>>;
  setFavData: React.Dispatch<React.SetStateAction<musicItem[]>>;
  setRecentData: React.Dispatch<React.SetStateAction<musicItem[]>>;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
  nextIndex: () => void;
  prevIndex: () => void;
  handleRecent: (id: number) => void;
  handleFav: (isFav: boolean) => void;
  playerRef: React.RefObject<boolean | null> | null;
  audioRef: React.RefObject<HTMLAudioElement> | null;
  data: data;
}

const context = createContext<context>({
  musicData: [],
  currSong: songData[0],
  duration: 0,
  totalDuration: 0,
  progressVal: "0%",
  loading: false,
  title: "",
  tab: "",
  favData: [],
  recentData: [],
  showNav: false,
  setCurrSong: (currSong) => currSong,
  setDuration: (duration) => duration,
  setTotalDuration: (duration) => duration,
  setProgressVal: (progressVal) => progressVal,
  setLoading: (loading) => loading,
  setTitle: (title) => title,
  setTab: (tab) => tab,
  setFavData: (data) => data,
  setRecentData: (data) => data,
  setShowNav: (nav) => nav,
  prevIndex() {},
  nextIndex() {},
  audioRef: null,
  playerRef: null,
  handleRecent() {},
  handleFav() {},
  data: {},
});

export default function MusicContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [musicData, _] = useState<musicItem[]>(songData);
  const [favData, setFavData] = useState<musicItem[]>(
    JSON.parse(window.localStorage.getItem("favorite") || "[]")
  );
  const [recentData, setRecentData] = useState<musicItem[]>(
    JSON.parse(sessionStorage.getItem("recents") || "[]")
  );
  const [currSong, setCurrSong] = useState<musicItem>(musicData[0]);
  const [duration, setDuration] = useState(0);
  const [totalDuration, setTotalDuration] = useState(currSong.duration);
  const [progressVal, setProgressVal] = useState("0%");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("For You");
  const [tab, setTab] = useState("home");
  const [showNav, setShowNav] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(new Audio(currSong.musicUrl));
  const playerRef = useRef(null);

  const prevIndex = () => {
    let findIndex = musicData.findIndex((music) => music.id === currSong.id);
    let currIndex = findIndex - 1 < 0 ? musicData.length - 1 : findIndex - 1;
    setCurrSong(musicData[currIndex]);
  };

  const nextIndex = () => {
    let findIndex = musicData.findIndex((music) => music.id === currSong.id);
    let currIndex = Math.floor((findIndex + 1) % musicData.length);
    setCurrSong(musicData[currIndex]);
  };

  const handleRecent = (id: number) => {
    console.log(id);
    const findIndex = recentData.findIndex((item) => item.id === id);
    if (findIndex < 0) {
      let oldData = recentData.slice(0, 9);
      oldData.unshift({ ...currSong });
      setRecentData(oldData);
    } else {
      const oldData = recentData;
      oldData.splice(findIndex, 1);
      oldData.unshift({ ...currSong });
      setRecentData(oldData);
    }
  };

  const handleFav = (isFav: boolean) => {
    if (!isFav) {
      setFavData((prev) => [{ ...currSong }, ...prev]);
    } else {
      setFavData((prev) => prev.filter((item) => item.id !== currSong.id));
    }
  };

  useEffect(() => {
    window.localStorage.setItem("favorite", JSON.stringify(favData));
  }, [favData]);

  useEffect(() => {
    sessionStorage.setItem("recents", JSON.stringify(recentData));
  }, [recentData]);

  const data = {
    home: musicData,
    tracks: musicData,
    favorites: favData,
    recents: recentData,
  };

  return (
    <context.Provider
      value={{
        musicData,
        currSong,
        duration,
        totalDuration,
        progressVal,
        loading,
        tab,
        title,
        favData,
        recentData,
        showNav,
        setCurrSong,
        setDuration,
        setTotalDuration,
        setProgressVal,
        setLoading,
        setTitle,
        setTab,
        setFavData,
        setRecentData,
        setShowNav,
        prevIndex,
        nextIndex,
        handleFav,
        handleRecent,
        audioRef,
        playerRef,
        data,
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
