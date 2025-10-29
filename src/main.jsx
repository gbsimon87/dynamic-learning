import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router';
import { ThemeProvider } from './context/ThemeContext';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import ClockGenerator from './pages/ClockGenerator';

import './App.css';
import './index.css'
// import App from './App.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'clock-generator', element: <ClockGenerator /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
