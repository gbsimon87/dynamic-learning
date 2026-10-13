import { Outlet, useLocation } from 'react-router';
import Navbar from '../components/ui/Navbar';
import BrainBreak from '../components/brainBreak/BrainBreak';
import AppFooter from '../components/ui/AppFooter';
import './RootLayout.css';

const FOOTER_PAGES = new Set(['/', '/curriculum', '/skills', '/trophies', '/profiles', '/parent', '/login', '/signup']);

function RootLayout() {
  const { pathname } = useLocation();
  const showFooter = FOOTER_PAGES.has(pathname.replace(/\/+$/, '') || '/');
  return (
    <div className={`app-layout${showFooter ? ' app-layout--with-footer' : ''}`}>
      <Navbar />
      <main className="app-layout-main">
        <Outlet />
      </main>
      {showFooter && <AppFooter />}
      <BrainBreak />
    </div>
  );
}

export default RootLayout;
