import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import axios from 'axios';
import '@/styles/global.css';
import PopupApp from './PopUpApp';
import { Toaster } from 'react-hot-toast';

window.addEventListener('error', (event) => {
  if (axios.isAxiosError(event.error)) {
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PopupApp />
    <Toaster />
  </StrictMode>
);
