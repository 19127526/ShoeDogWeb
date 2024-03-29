import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./store/Store";
import Loading from "../src/components/loading/LoadingComponent";
import ThemeContextProvider from "./context/ContextProvider";
export const UserContext = React.createContext();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={<Loading/>} persistor={persistor}>
      <ThemeContextProvider>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
      </ThemeContextProvider>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
