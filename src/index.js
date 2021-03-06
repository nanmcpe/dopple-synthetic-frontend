import './App.css';
import React from 'react';
import { render } from 'react-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import App from './App';

// optional configuration
const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '10px',
  transition: transitions.SCALE
};

const Root = () => (
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>
);

render(<Root />, document.getElementById('root'));