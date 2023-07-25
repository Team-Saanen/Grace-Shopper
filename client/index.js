import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
// import { Router } from "react-router-dom";
// import { BrowserRouter as Router } from "react-router-dom";
// import history from "./history";
import store from "./store";
import Main from "./components/Main";

// ReactDOM.render(
//   <Provider store={store}>
//     <Router history={history}>
//       <Main />
//     </Router>
//   </Provider>,
//   document.getElementById("app")
// );

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <Main />
  </Provider>
);
