import { h } from 'preact';
import { Subscribe } from 'unstated';
import UserContainer from "../containers/UserContainer.js";
import LayoutContainer from "../containers/LayoutContainer.js";
import MainMenu from "./MainMenu.jsx";

export default function(p) {
  let title = p.title || "PlantDaddy" ;
  return (
    <Subscribe to={[UserContainer,LayoutContainer]}>
      {function(user,layout) {
        let menu = (user.state.isLoggedIn) ? <MainMenu /> : null;
        return(
          <div id="app" className={(layout.state.menuOpen) ? "menu-open" : null}>
            {menu}
            <div id="app">
              <div class="header">
                <div class="left-side">
                  {p.headerLeft}
                </div>
                <h1>{title}</h1>
                <div class="right-side">
                  {p.headerRight}
                </div>
              </div>
              <div class="content">
                {p.children}
              </div>
            </div>
          </div>
        )
      }}
    </Subscribe>
  )
}
