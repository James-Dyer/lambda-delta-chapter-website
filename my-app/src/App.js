// App.js
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home/Home';
import Donate from './components/Donate/Donate';
import Members from './components/Members';
import Archive from './components/Archive';
import Philanthropy from './components/Philanthropy';
import Alumni from './components/Alumni';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/members" element={<Members />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/philanthropy" element={<Philanthropy />} />
        <Route path="/alumni" element={<Alumni />} />
      </Routes>
    </Router>
  );
}

export default App;
