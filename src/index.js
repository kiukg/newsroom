import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App"

ReactDOM.render(
  // <BrowserRouter>
  //   <Provider>
      <App></App>
  //   </Provider>
  // </BrowserRouter>
  ,
  document.getElementById('root')
);


