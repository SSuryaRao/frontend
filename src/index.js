import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home_page from './landing_page/home/Home_page';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './landing_page/Header';
import Navbar from './landing_page/Navbar';
import DashPage from './landing_page/dashboard/DashPage';
import Hero1 from './landing_page/earthquake/Hero1';
import Hero2 from './landing_page/flood/Hero2';
import Hero3 from './landing_page/landslide/Hero3';
import Hero4 from './landing_page/helpline/Hero4';
import NotFound from './landing_page/NotFound';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home_page />} />
        <Route path="/dashboard" element={<DashPage />} />
        <Route path="/earthquake" element={<Hero1 />} />
        <Route path="/flood" element={<Hero2 />} />
        <Route path="/landslide" element={<Hero3 />} />
        <Route path="/helpline" element={<Hero4 />} />
        <Route path="*" element={<NotFound />} />
        {/* Add more routes here as needed */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
