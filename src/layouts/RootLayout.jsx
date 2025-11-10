import { Outlet } from 'react-router';
import Navbar from '../components/ui/Navbar';

function RootLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
