import { linkData } from "../data/musicData";
import { useMusicContext } from "../lib/store/Store";

const Sidebar = () => {
  const { tab, setTab, setTitle, setShowNav, showNav } = useMusicContext();
  return (
    <aside>
      <header>
        <img className="logo--img" src="/logo.png" alt="Spotify" />
        <nav className="nav">
          <ul>
            {linkData?.map((link, index) => (
              <li
                className={`${tab === link.label && "active"}`}
                onClick={() => {
                  setTab(link.label);
                  setTitle(link.title);
                  if (!showNav) {
                    setShowNav(true);
                  }
                }}
                key={index}
              >
                {link.title}
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <img src="./profile-img.png" alt="Abhishek Choudhary" />
    </aside>
  );
};

export default Sidebar;
