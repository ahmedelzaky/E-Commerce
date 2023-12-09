import "./navbar.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import profile from "../../../assets/profile.jpeg";
import "../../../style/dark.css";
import { useContext } from "react";
import { darkContext } from "../../../context/darkModeContext";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";

const Navbar = () => {
  const { handleDarkMode, dark } = useContext(darkContext);
  return (
    <div className="navbar-admin">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>

        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item" onClick={handleDarkMode}>
            {dark ? (
              <WbSunnyOutlinedIcon className="icon sun" />
            ) : (
              <DarkModeOutlinedIcon className="icon" />
            )}
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <img src={profile} className="avatar" alt="profile" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
