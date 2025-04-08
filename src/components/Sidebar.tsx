import { linkData } from "../data/musicData";

const Sidebar = () => {
  return (
    <aside>
      <img className="logo--img" src="/logo.png" alt="Spotify" />
      <nav className="nav">
        <ul>
          {linkData?.map((link, index) => (
            <li key={index}>{link.title}</li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
