import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App.js';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
);
