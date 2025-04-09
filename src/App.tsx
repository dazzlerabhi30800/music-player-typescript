import "./styles/style.scss";
import Sidebar from "./components/Sidebar";
import MusicWrapper from "./components/MusicWrapper";
import MusicPlayer from "./components/MusicPlayer";
import { useMusicContext } from "./lib/store/Store";

function App() {
  const { currSong } = useMusicContext();
  return (
    <>
      <main style={{ "--bg-1": currSong.bg1, "--bg-2": currSong.bg2 }}>
        <Sidebar />
        <MusicWrapper />
        <MusicPlayer />
      </main>
    </>
  );
}

export default App;
