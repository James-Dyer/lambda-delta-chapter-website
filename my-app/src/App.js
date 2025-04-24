// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home/Home';
import Donate from './components/Donate/Donate';
import Members from './components/Members';
import Archive from './components/Archive';
import Philanthropy from './components/Philanthropy';
import Alumni from './components/Alumni';
import Recruitment from './components/Recruitment';

function App() {
  return (
    <Router basename="/lambda-delta-chapter-website">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/members" element={<Members />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/philanthropy" element={<Philanthropy />} />
        <Route path="/Alumni" element={<Alumni />} />
        <Route path="/Recruitment" element={<Recruitment />} />
      </Routes>
    </Router>
  );
}

export default App;
