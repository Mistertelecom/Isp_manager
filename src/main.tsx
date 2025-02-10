import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Remove any existing styles from the document
const styles = document.querySelectorAll('style');
styles.forEach(style => style.remove());

// Create root element if it doesn't exist
const rootElement = document.getElementById('root');
if (!rootElement) {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
