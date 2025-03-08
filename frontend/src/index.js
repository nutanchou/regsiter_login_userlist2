import React from 'react';
import ReactDOM from 'react-dom/client'; // For React 18, use `react-dom/client`
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter here
import App from './App'; // Import your root component

// Render the App component inside the BrowserRouter (Router)
const root = ReactDOM.createRoot(document.getElementById('root')); // For React 18+
root.render(
  <BrowserRouter> {/* Only one Router should be here */}
    <App />
  </BrowserRouter>
);
