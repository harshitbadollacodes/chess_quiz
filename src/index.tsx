import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {  BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import { LevelProvider } from './context/LevelsContext';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <LevelProvider>
          <App />
        </LevelProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);