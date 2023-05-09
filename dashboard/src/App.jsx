import { createContext, useEffect, useState } from "react";
import {BrowserRouter as Router} from "react-router-dom";

import "./../src/assets/bootstrap-5.1.3-dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import CreateArticle from "./components/CreateArticle";
import useWindowSize from "./hooks/useWindowResize.hook";
import Logs from "./components/Logs";
import PageLayout from "./pages/PageLayout"
import Routes from "./routes"

export const MenuContext = createContext(null);

function App() {
  

  return (
    <Router>
      <Routes></Routes>
    </Router>
  );
}

export default App;
