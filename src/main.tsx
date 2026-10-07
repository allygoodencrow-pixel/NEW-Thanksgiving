import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CloudApp from './CloudApp';
import './app-layout.css';
import './typography.css';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CloudApp />
  </StrictMode>
);

// Device geometry follows component styles; typography stays the final owner.
