import AuthProvider from '@components/AuthProvider';
import ReactDOM from 'react-dom/client';
import Router from './Router';
import './index.css';
import ServiceProvider from '@components/ServiceProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ServiceProvider>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </ServiceProvider>
);
