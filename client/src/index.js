import React from "react";
import ReactDOM  from "react-dom";

import { Provider } from "react-redux"; // keep tracks of the store, wich is the global state, and that allows us to access
                                        // that store from anywhere inside the app
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

import App from "./App.js"
import "./index.css"

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));