import React from "react";
import {Provider} from "react-redux";
import Nav from "./Nav";
import store from "../redux/store"
import "../css/Site.css"
const App = () => {
    return(
        <Provider store={store}>
            <Nav></Nav>
        </Provider>
    )
}

export default App;