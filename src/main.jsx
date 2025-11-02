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
import MathPractice from './pages/MathPractice';
import WorldMap from './pages/WorldMap';
import FindTheMissingNumber from './pages/FindTheMissingNumber';
import FlagFinder from './pages/FlagFinder';
import SentenceBuilder from './pages/SentenceBuilder';
import WordSorter from './pages/WordSorter';
import OppositeMatch from './pages/OppositeMatch';
import SynonymSafari from './pages/SynonymSafari';

import './App.css';
import './index.css'
import 'leaflet/dist/leaflet.css';

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
      { path: 'arithmetic-practice', element: <MathPractice /> },
      { path: 'world-map', element: <WorldMap /> },
      { path: '/missing-number', element: <FindTheMissingNumber /> },
      { path: '/flag-finder', element: <FlagFinder /> },
      { path: '/sentence-builder', element: <SentenceBuilder /> },
      { path: '/word-sorter', element: <WordSorter /> },
      { path: '/opposite-match', element: <OppositeMatch /> },
      { path: '/synonym-match', element: <SynonymSafari /> },
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
