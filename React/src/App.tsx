import React, { useState } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom"
import Routing from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TopNavbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function App() {

  return (
    <>
      <TopNavbar></TopNavbar>
      <Routing />
      <Footer></Footer>
    </>   
  );
}

export default App;
