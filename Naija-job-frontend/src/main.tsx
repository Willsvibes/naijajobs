import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import RoutesConfig from './routes/routes';
import { AuthProvider } from './Hooks/authContext';// import context

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RoutesConfig />
    </AuthProvider>
  </StrictMode>
);