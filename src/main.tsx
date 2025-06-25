import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import axios from 'axios';
import '@/styles/global.css';
import App from './App';

window.addEventListener('error', (event) => {
  if (axios.isAxiosError(event.error)) {
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
