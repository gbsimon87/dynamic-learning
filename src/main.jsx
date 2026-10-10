import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { RewardsProvider } from "./context/RewardsContext";
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
import MoneyMatch from "./pages/skills/math/MoneyMatch";
import MeasureIt from "./pages/skills/math/MeasureIt";
import RobotMoves from "./pages/skills/math/RobotMoves";
import ChartDetective from "./pages/skills/math/ChartDetective";
import PlaceValueGame from "./pages/skills/math/PlaceValueGame";
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
import TrophyRoom, { ChildTrophyRoom } from "./pages/trophies/TrophyRoom";

// === AUTH: parent accounts + child profiles ===
import { ForgotPassword, ResetPassword } from "./pages/auth/PasswordRecovery";
import Login from "./pages/auth/Login";
import SignUpFlow from "./pages/auth/signup/SignUpFlow";
import Profiles from "./pages/auth/Profiles";
import ParentArea from "./pages/auth/ParentArea";

// === SKILLS ===
import SkillsPage from "./pages/skills/SkillsPage";
import CurriculumPage from "./pages/curriculum/CurriculumPage";
import CurriculumSelectPage from "./pages/curriculum/CurriculumSelectPage";
import NotFound from "./pages/NotFound";

// Self-hosted so no page load sends a visitor's IP address to Google Fonts.
import "@fontsource/abeezee/400.css";
import "@fontsource/abeezee/400-italic.css";
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
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "signup", element: <SignUpFlow /> },
      { path: "profiles", element: <Profiles /> },
      { path: "parent", element: <ParentArea /> },
      // A grown-up's view of one child's Trophy Room. Outside RequireChild: a
      // parent looks from /parent, often with no child selected.
      { path: "parent/trophies/:childId", element: <ChildTrophyRoom /> },

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

          // Trophy Room: badges + topic stickers. Gated like the curriculum,
          // since it shows a specific child's progress.
          { path: "trophies", element: <TrophyRoom /> },

          // Bix's first-play intro (once per child; replayable from /parent)
          { path: "hello", lazy: () => import("./pages/intro/BixIntro").then((m) => ({ Component: m.default })) },
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
      // Free-play games on the challenge kit (components/skills/FreePlayShell).
      { path: "money", element: <MoneyMatch /> },
      { path: "measure", element: <MeasureIt /> },
      { path: "robot-moves", element: <RobotMoves /> },
      { path: "charts", element: <ChartDetective /> },
      { path: "place-value", element: <PlaceValueGame /> },
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

      // === Daily Bix puzzle: ungated; a signed-in child collects one star a day ===
      { path: "daily-puzzle", lazy: () => import("./pages/puzzle/DailyPuzzle").then((m) => ({ Component: m.default })) },

      // === Third-party notices for the Science artwork (lazy: holds full licence texts) ===
      { path: "credits", lazy: () => import("./pages/credits/Credits").then((m) => ({ Component: m.default })) },

      // === Privacy (placeholder until the #11 review; lazy like credits) ===
      { path: "privacy", lazy: () => import("./pages/privacy/Privacy").then((m) => ({ Component: m.default })) },

      // === Catch-all: any unmatched path ===
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RewardsProvider>
          <RouterProvider router={router} />
        </RewardsProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
