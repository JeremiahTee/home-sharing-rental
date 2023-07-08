import { Layout } from "antd";
import { Viewer } from "../../lib/types";
import { NavLink } from "react-router-dom";
import { MenuItems } from "./components/MenuItems";

import logo from "./assets/housebnb-logo.png";

interface AppHeaderProps {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

const { Header } = Layout;

export const AppHeader = ({ viewer, setViewer }: AppHeaderProps) => {
  console.log("AppHeader viewer: ", viewer);
  return (
    <Header className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <NavLink to="/">
            <img src={logo} alt="TinyHouse logo" />
          </NavLink>
        </div>
      </div>
      <div className="app-header__menu-section">
        <MenuItems viewer={viewer} setViewer={setViewer} />
      </div>
    </Header>
  );
};
