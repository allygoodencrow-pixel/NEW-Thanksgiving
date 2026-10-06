import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CloudApp from './CloudApp';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CloudApp />
  </StrictMode>
);

import './reference.css';

import './planning-glass.css';

import './clarity.css';

import './workspace.css';


import './recipe-layout.css';

import './shopping-layout.css';


import './menu-studio.css';
import './account.css';
// Device geometry follows component styles; typography stays the final owner.
import './responsive-app.css';
import './typography.css';
