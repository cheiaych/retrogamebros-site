import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom"
import Routing from './Routes';

function App() {

  return (
    <Router>
      <Routing />
    </Router>
  );
}

export default App;
