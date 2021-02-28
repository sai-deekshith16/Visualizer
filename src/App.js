import React, {useState} from 'react';
import './App.scss';
import { Header } from './components/Header'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/Home';
import Footer from './components/Footer';

import MainPage from "./components/MainPage";
import PrimsMainPage from "./components/PrimsMainPage";
function App() {
  return (
    <Router>
        <div className="content">
          <Header projectName={'Visualizer'} />
          <Route exact path="/" component={Home} />
          <Route path = "/Eulerian" component={MainPage} />
          <Route path = "/Prims" component={PrimsMainPage} />
        </div>
        <div className="footer">
          <Footer />
        </div>
    </Router>
  );
}

export default App;
