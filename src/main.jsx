import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import RequireChild from "./components/RequireChild";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/home/Home";

// === SKILLS: Math ===
import ClockGenerator from "./pages/skills/math/ClockGenerator";
import ReadingNumbers from "./pages/skills/math/ReadingNumbers";
import MultiplicationTable from "./pages/skills/math/MultiplicationTable";
import MathPractice from "./pages/skills/math/MathPractice";
import FindTheMissingNumber from "./pages/skills/math/FindTheMissingNumber";
import NumberBonds from "./pages/skills/math/NumberBonds";
import FractionFun from "./pages/skills/math/FractionFun";
import ShapeExplorer from "./pages/skills/math/ShapeExplorer";

// === SKILLS: English ===
import WordBuilder from "./pages/skills/english/WordBuilder";
import WordSorter from "./pages/skills/english/WordSorter";
import SentenceBuilder from "./pages/skills/english/SentenceBuilder";
import OppositeMatch from "./pages/skills/english/OppositeMatch";
import SynonymSafari from "./pages/skills/english/SynonymSafari";
import SightWordPop from "./pages/skills/english/SightWordPop";
import SpeedReader from "./pages/skills/english/SpeedReader";

// === SKILLS: Geography ===
import WorldMap from "./pages/skills/geography/WorldMap";
import FlagFinder from "./pages/skills/geography/FlagFinder";
import CitySpotlight from "./pages/skills/geography/CitySpotlight";
import SolarSystem from "./pages/skills/geography/SolarSystem";

// === CURRICULUM ===
import ProblemView from "./pages/curriculum/ProblemView";

// === AUTH: parent accounts + child profiles ===
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Profiles from "./pages/auth/Profiles";
import ParentArea from "./pages/auth/ParentArea";

// === SKILLS ===
import SkillsPage from "./pages/skills/SkillsPage";
import CurriculumPage from "./pages/curriculum/CurriculumPage";
import CurriculumSelectPage from "./pages/curriculum/CurriculumSelectPage";
import NotFound from "./pages/NotFound";

import "./App.css";
import "./index.css";
import "leaflet/dist/leaflet.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },

      // === Skills Hub ===
      { path: "skills", element: <SkillsPage /> },

      // === Auth: ungated, these are how you get an account in the first place ===
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "profiles", element: <Profiles /> },
      { path: "parent", element: <ParentArea /> },

      // === Curriculum: gated — progress belongs to a specific child profile ===
      // Skills Mode and Home stay completely ungated.
      {
        element: <RequireChild />,
        children: [
          // Curriculum: year/subject picker
          { path: "curriculum", element: <CurriculumSelectPage /> },

          // Curriculum: a specific year + subject
          { path: "curriculum/year/:year/:subject", element: <CurriculumPage /> },

          // Curriculum Problem View
          {
            path: "year/:year/:subject/problem/:categoryId/:topicId/:challengeId",
            element: <ProblemView />,
          },
        ],
      },

      // === Math Skills ===
      { path: "clock-generator", element: <ClockGenerator /> },
      { path: "reading-numbers", element: <ReadingNumbers /> },
      { path: "multiplication-table", element: <MultiplicationTable /> },
      { path: "arithmetic-practice", element: <MathPractice /> },
      { path: "missing-number", element: <FindTheMissingNumber /> },
      { path: "number-bonds", element: <NumberBonds /> },
      { path: "fraction-fun", element: <FractionFun /> },
      { path: "shapes", element: <ShapeExplorer /> },

      // === English Skills ===
      { path: "word-builder", element: <WordBuilder /> },
      { path: "word-sorter", element: <WordSorter /> },
      { path: "sentence-builder", element: <SentenceBuilder /> },
      { path: "opposite-match", element: <OppositeMatch /> },
      { path: "synonym-match", element: <SynonymSafari /> },
      { path: "sight-word-pop", element: <SightWordPop /> },
      { path: "speed-reader", element: <SpeedReader /> },

      // === Geography Skills ===
      { path: "world-map", element: <WorldMap /> },
      { path: "flag-finder", element: <FlagFinder /> },
      { path: "city-spotlight", element: <CitySpotlight /> },
      { path: "solar-system", element: <SolarSystem /> },

      // === Catch-all: any unmatched path ===
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
