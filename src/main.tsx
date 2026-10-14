import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './app-layout.css';
import './typography.css';

// Buyer demos never initialize the cloud client or an account session.
const buyerDemo = new URLSearchParams(window.location.search).get('demo') === '1';
const Root = lazy(() => buyerDemo ? import('./BuyerDemo') : import('./CloudApp'));
createRoot(document.getElementById('root')!).render(
  <StrictMode><Suspense fallback={<p role="status">Opening Thanksgiving…</p>}><Root /></Suspense></StrictMode>
);
