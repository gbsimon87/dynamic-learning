import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router';
import { ThemeProvider } from './context/ThemeContext';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import ClockGenerator from './pages/ClockGenerator';
import CountingNumbers from './pages/CountingNumbers';
import MultiplicationTable from './pages/MultiplicationTable';
import ShapeExplorer from './pages/ShapeExplorer';
import WordBuilder from './pages/WordBuilder';

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
      { path: 'counting-numbers', element: <CountingNumbers /> },
      { path: 'multiplication-table', element: <MultiplicationTable /> },
      { path: 'shapes', element: <ShapeExplorer /> },
      { path: 'word-builder', element: <WordBuilder /> },
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
