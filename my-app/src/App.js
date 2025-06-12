// App.js
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Header from './components/Header';
import Home from './components/Home/Home';
import Donate from './components/Donate/Donate';
import Members from './components/Members';
import Archive from './components/Archive';
import Philanthropy from './components/Philanthropy';
import Alumni from './components/Alumni';

const PageWrapper = ({ children }) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      {...(!reduceMotion && {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.3 },
      })}
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/donate" element={<PageWrapper><Donate /></PageWrapper>} />
        <Route path="/members" element={<PageWrapper><Members /></PageWrapper>} />
        <Route path="/archive" element={<PageWrapper><Archive /></PageWrapper>} />
        <Route path="/philanthropy" element={<PageWrapper><Philanthropy /></PageWrapper>} />
        <Route path="/alumni" element={<PageWrapper><Alumni /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <Header />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
