import { linkData } from "../data/musicData";

const Sidebar = () => {
  return (
    <aside>
      <header>
        <img className="logo--img" src="/logo.png" alt="Spotify" />
        <nav className="nav">
          <ul>
            {linkData?.map((link, index) => (
              <li key={index}>{link.title}</li>
            ))}
          </ul>
        </nav>
      </header>
      <img src="./profile-img.png" alt="Abhishek Choudhary" />
    </aside>
  );
};

export default Sidebar;
