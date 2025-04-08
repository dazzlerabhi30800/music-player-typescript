import "./styles/style.scss";
import Sidebar from "./components/Sidebar";
import MusicWrapper from "./components/MusicWrapper";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  return (
    <>
      <main>
        <Sidebar />
        <MusicWrapper />
        <MusicPlayer />
      </main>
    </>
  );
}

export default App;
