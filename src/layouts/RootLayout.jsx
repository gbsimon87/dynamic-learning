import { Outlet } from 'react-router';
import Navbar from '../components/ui/Navbar';
import BrainBreak from '../components/brainBreak/BrainBreak';

function RootLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <BrainBreak />
    </>
  );
}

export default RootLayout;
