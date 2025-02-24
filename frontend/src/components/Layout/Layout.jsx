import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Hero from '../Hero/Hero';
import Footer from '../Footer/Footer';
import Loan from '../Loan/Loan';
import CardComponent from "../Last/CardComponent";

import About from '../About/About';
import Contact from '../Contact/Contact';
import Slider from 'react-slick';

const Layout = () => {
  return (
    <div>
      <Navigation />
      <Hero />
      <CardComponent/>

      <Routes>
        
      </Routes>
      <Footer />
    </div>
  );
};

export default Layout;