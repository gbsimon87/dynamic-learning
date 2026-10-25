import { Outlet, useLocation } from 'react-router';
import Navbar from '../components/ui/Navbar';
import BrainBreak from '../components/brainBreak/BrainBreak';
import AppFooter from '../components/ui/AppFooter';
import PageMetadata from '../seo/PageMetadata';
import './RootLayout.css';

const FOOTER_PAGES = new Set(['/', '/what-we-teach', '/curriculum', '/skills', '/trophies', '/profiles', '/parent', '/login', '/signup']);

function RootLayout() {
  const { pathname } = useLocation();
  const showFooter = FOOTER_PAGES.has(pathname.replace(/\/+$/, '') || '/') || pathname.startsWith('/learn/') || pathname.startsWith('/curriculum-guide/');
  const isSolarSystem = pathname === '/solar-system';
  return (
    <div className={`app-layout${showFooter ? ' app-layout--with-footer' : ''}${isSolarSystem ? ' app-layout--solar-system' : ''}`}>
      <PageMetadata />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="app-layout-main">
        <Outlet />
      </main>
      {showFooter && <AppFooter />}
      <BrainBreak />
    </div>
  );
}

export default RootLayout;
