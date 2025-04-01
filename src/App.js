import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout/MainLayout'; // New import
import Hero from './components/Hero/Hero';
import RentLogin from './components/Auth/RentLogin';
import SellLogin from './components/Auth/SellLogin';
import Contact from './components/Contact/Contact';
import About from './components/About/About';
import AboutLayout from './components/About/AboutLayout';
import Testimonials from './components/Testimonials/Testimonials';
import Team from './components/Team/Team';
import Press from './components/Press/Press';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './components/NotFound/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Wrap ALL routes with MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Hero />} />
          <Route path="/rent-login" element={<RentLogin />} />
          <Route path="/sell-login" element={<SellLogin />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* About section nested routes */}
          <Route path="/about" element={<AboutLayout />}>
            <Route index element={<About />} />
            <Route path="team" element={<Team />} />
            <Route path="press" element={<Press />} />
          </Route>
          
          <Route path="/reviews" element={<Testimonials />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;