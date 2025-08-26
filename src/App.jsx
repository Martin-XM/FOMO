import AddItem from "./AddItem.jsx";
import MissingGamesList from "./MissingGamesList.jsx";
import CollectList from "./CollectList.jsx";
import Login from "./login.jsx";
import DiscordWidget from "./discordWidget.jsx";  
import Footer from "./Footer.jsx";
import {
  mainPageStyle,
  navStyle,
  navLogoCenter,
  navRightBox,
} from "./tailwindClasses.js";

export default function App() {
  return (
    <div className={mainPageStyle}>
          <nav className={navStyle}>
              <div className={navLogoCenter}>
              <span>F</span>
              <img src="/src/assets/logo-disc.png" alt="Logo" className="logoDisc" />
              <span>MO</span>
            </div>
    
            <div className={navRightBox}>
              <Login />
            </div>
          </nav>
    
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="grid grid-cols-1">
              <AddItem />
              <MissingGamesList />
            </div>
            <div>
              <CollectList />
            </div>
          </div>
            <DiscordWidget />
            <Footer />       
    </div>
  )
}