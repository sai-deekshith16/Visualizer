import React, {useState} from 'react';
import './App.scss';
import { Header } from './components/Header'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/Home';
import Footer from './components/Footer';

import MainPage from "./components/MainPage";
function App() {
  return (
    <Router>
        <div className="content">
          <Header projectName={'Visualizer'} />
          <Route exact path="/" component={Home} />
          <Route path = "/Blank1" component={MainPage} />
        </div>
        <div className="footer">
          <Footer />
        </div>
    </Router>
  );
}

export default App;
