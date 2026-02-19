import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Veille from './pages/Veille';
import About from './pages/About';
import Technologies from './pages/Technologies';
import CV from './pages/CV';
import Contact from './pages/Contact';
import AdminPanel from './pages/AdminPanel';
import Copyright from './pages/Copyright';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/veille" element={<Veille />} />
        <Route path="/about" element={<About />} />
        <Route path="/technologies" element={<Technologies />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/copyright" element={<Copyright />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
