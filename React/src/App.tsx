import React, { useState } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom"
import Routing from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TopNavbar from './components/Navbar/Navbar';

function App() {

  return (
    <>
      <TopNavbar></TopNavbar>
      <Routing />
    </>   
  );
}

export default App;
