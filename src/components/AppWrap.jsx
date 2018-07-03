import { h } from 'preact';

import { Subscribe, Provider } from 'unstated';

import MainApp from "./app.js";

import UserContainer from "../containers/UserContainer.js";




export default function() {
  return (
    <Provider>
    <MainApp />

    </Provider>
  )
}
