import { h } from 'preact';
import style from './style.less';
import Layout from "../Layout.jsx";
import {Subscribe} from "unstated";

import LayoutContainer from "../../containers/LayoutContainer";
import UserContainer from "../../containers/UserContainer";

import ProfileImage from "../common/ProfileImage";
export default function(props) {
  return(


     <Subscribe to={[LayoutContainer,UserContainer]}>
      {function(layout,user) {
      return(
        <Layout headerLeft={<button onClick={layout.toggleMenu}><ProfileImage user={user.state.user} /></button>}>
          <div>
            Hi, {props.user.state.user.first_name}
          </div>
        </Layout>
      )

    }

  }
  </Subscribe>
)
}
