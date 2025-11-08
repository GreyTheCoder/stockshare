import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './index.css';
import Homepage from './Landing_page/Home/Homepage'
import Signup from './Landing_page/Signup/Signup'
import Aboutpage from './Landing_page/About/Aboutpage'
import Productpage from './Landing_page/Products/ProductPage'
import Pricingpage from './Landing_page/Pricing/PricingPage'
import Supportpage from './Landing_page/Support/SupportPage'
import Navbar from './Navbar';
import Footer from './Footer';
import Notfound from './Landing_page/Notfound';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <BrowserRouter>
        <Navbar/>
 <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="/signup" element={<Signup/>} />
    <Route path="/about" element={<Aboutpage />} />
    <Route path="/product" element={<Productpage/>} />
    <Route path="/pricing" element={<Pricingpage />} />
    <Route path="/support" element={<Supportpage/>} />
    <Route path="*" element={<Notfound />} />
 </Routes>
  <Footer/>

 </BrowserRouter>

);


