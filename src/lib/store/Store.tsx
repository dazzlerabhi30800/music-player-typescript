import { createContext, useContext, useState } from "react";
import { songData } from "../../data/musicData";
import { musicItem } from "../../vite-env";

interface context {
  musicData: musicItem[];
}

const context = createContext<context>({
  musicData: [],
});

export default function MusicContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [musicData, _] = useState<musicItem[]>(songData);
  return <context.Provider value={{ musicData }}>{children}</context.Provider>;
}

export const useMusicContext = () => {
  const musicContext = useContext(context);
  if (!musicContext) {
    throw new Error("Music context is not wrapped");
  }
  return musicContext;
};
