import "./pointerModality";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { RewardsProvider } from "./context/RewardsContext";
import RequireChild from "./components/RequireChild";
import RootLayout from "./layouts/RootLayout";
import SkillGameLayout from "./components/skills/SkillGameLayout";
import Home from "./pages/home/Home";
import SkillGuide from "./seo/SkillGuide";
import CurriculumGuide, { CurriculumOverview } from "./seo/CurriculumGuide";

// Hubs and public guides render immediately; game/account routes load on demand.
import SkillsPage from "./pages/skills/SkillsPage";
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
      { path: "what-we-teach", element: <CurriculumOverview /> },
      { path: "curriculum-guide/:slug", element: <CurriculumGuide /> },
      // Public descriptions are prerendered; existing play routes stay ungated.
      { path: "learn/:slug", element: <SkillGuide /> },

      // === Auth: ungated, these are how you get an account in the first place ===
      { path: "login", lazy: () => import("./pages/auth/Login").then((m) => ({ Component: m.default })) },
      { path: "forgot-password", lazy: () => import("./pages/auth/PasswordRecovery").then((m) => ({ Component: m.ForgotPassword })) },
      { path: "reset-password", lazy: () => import("./pages/auth/PasswordRecovery").then((m) => ({ Component: m.ResetPassword })) },
      { path: "signup", lazy: () => import("./pages/auth/signup/SignUpFlow").then((m) => ({ Component: m.default })) },
      { path: "profiles", lazy: () => import("./pages/auth/Profiles").then((m) => ({ Component: m.default })) },
      { path: "parent", lazy: () => import("./pages/auth/ParentArea").then((m) => ({ Component: m.default })) },
      // A grown-up's view of one child's Trophy Room. Outside RequireChild: a
      // parent looks from /parent, often with no child selected.
      { path: "parent/trophies/:childId", lazy: () => import("./pages/trophies/TrophyRoom").then((m) => ({ Component: m.ChildTrophyRoom })) },

      // === Curriculum: gated — progress belongs to a specific child profile ===
      // Skills Mode and Home stay completely ungated.
      {
        element: <RequireChild />,
        children: [
          // Curriculum: year/subject picker
          { path: "curriculum", lazy: () => import("./pages/curriculum/CurriculumSelectPage").then((m) => ({ Component: m.default })) },

          // Curriculum: a specific year + subject
          { path: "curriculum/year/:year/:subject", lazy: () => import("./pages/curriculum/CurriculumPage").then((m) => ({ Component: m.default })) },

          // Curriculum Problem View
          {
            path: "year/:year/:subject/problem/:categoryId/:topicId/:challengeId",
            lazy: () => import("./pages/curriculum/ProblemView").then((m) => ({ Component: m.default })),
          },

          // Trophy Room: badges + topic stickers. Gated like the curriculum,
          // since it shows a specific child's progress.
          { path: "trophies", lazy: () => import("./pages/trophies/TrophyRoom").then((m) => ({ Component: m.default })) },

          // Bix's first-play intro (once per child; replayable from /parent)
          { path: "hello", lazy: () => import("./pages/intro/BixIntro").then((m) => ({ Component: m.default })) },

        ],
      },

      // === Skills games: every one lives under /skills/<name> with a shared back bar ===
      {
        element: <SkillGameLayout />,
        children: [
          { path: "skills/clock-generator", lazy: () => import("./pages/skills/math/ClockGenerator").then((m) => ({ Component: m.default })) },
          { path: "skills/reading-numbers", lazy: () => import("./pages/skills/math/ReadingNumbers").then((m) => ({ Component: m.default })) },
          { path: "skills/multiplication-table", lazy: () => import("./pages/skills/math/MultiplicationTable").then((m) => ({ Component: m.default })) },
          { path: "skills/times-tables", lazy: () => import("./pages/skills/math/TimesTablesRace").then((m) => ({ Component: m.default })) },
          { path: "skills/arithmetic-practice", lazy: () => import("./pages/skills/math/MathPractice").then((m) => ({ Component: m.default })) },
          { path: "skills/missing-number", lazy: () => import("./pages/skills/math/FindTheMissingNumber").then((m) => ({ Component: m.default })) },
          { path: "skills/number-bonds", lazy: () => import("./pages/skills/math/NumberBonds").then((m) => ({ Component: m.default })) },
          { path: "skills/fraction-fun", lazy: () => import("./pages/skills/math/FractionFun").then((m) => ({ Component: m.default })) },
          { path: "skills/money", lazy: () => import("./pages/skills/math/MoneyMatch").then((m) => ({ Component: m.default })) },
          { path: "skills/measure", lazy: () => import("./pages/skills/math/MeasureIt").then((m) => ({ Component: m.default })) },
          { path: "skills/robot-moves", lazy: () => import("./pages/skills/math/RobotMoves").then((m) => ({ Component: m.default })) },
          { path: "skills/charts", lazy: () => import("./pages/skills/math/ChartDetective").then((m) => ({ Component: m.default })) },
          { path: "skills/place-value", lazy: () => import("./pages/skills/math/PlaceValueGame").then((m) => ({ Component: m.default })) },
          { path: "skills/rule-zoo", lazy: () => import("./pages/skills/math/RuleZoo").then((m) => ({ Component: m.default })) },
          { path: "skills/shapes", lazy: () => import("./pages/skills/math/ShapeExplorer").then((m) => ({ Component: m.default })) },
          { path: "skills/word-builder", lazy: () => import("./pages/skills/english/WordBuilder").then((m) => ({ Component: m.default })) },
          { path: "skills/word-sorter", lazy: () => import("./pages/skills/english/WordSorter").then((m) => ({ Component: m.default })) },
          { path: "skills/sentence-builder", lazy: () => import("./pages/skills/english/SentenceBuilder").then((m) => ({ Component: m.default })) },
          { path: "skills/opposite-match", lazy: () => import("./pages/skills/english/OppositeMatch").then((m) => ({ Component: m.default })) },
          { path: "skills/synonym-match", lazy: () => import("./pages/skills/english/SynonymSafari").then((m) => ({ Component: m.default })) },
          { path: "skills/sight-word-pop", lazy: () => import("./pages/skills/english/SightWordPop").then((m) => ({ Component: m.default })) },
          { path: "skills/speed-reader", lazy: () => import("./pages/skills/english/SpeedReader").then((m) => ({ Component: m.default })) },
          { path: "skills/world-map", lazy: () => import("./pages/skills/geography/WorldMap").then((m) => ({ Component: m.default })) },
          { path: "skills/flag-finder", lazy: () => import("./pages/skills/geography/FlagFinder").then((m) => ({ Component: m.default })) },
          { path: "skills/city-spotlight", lazy: () => import("./pages/skills/geography/CitySpotlight").then((m) => ({ Component: m.default })) },
          { path: "skills/find-the-city", lazy: () => import("./pages/skills/geography/FindTheCity").then((m) => ({ Component: m.default })) },
          { path: "skills/solar-system", lazy: () => import("./pages/skills/geography/SolarSystemPage").then((m) => ({ Component: m.default })) },
        ],
      },
      // Old flat game URLs.
      { path: "clock-generator", element: <Navigate to="/skills/clock-generator" replace /> },
      { path: "reading-numbers", element: <Navigate to="/skills/reading-numbers" replace /> },
      { path: "multiplication-table", element: <Navigate to="/skills/multiplication-table" replace /> },
      { path: "arithmetic-practice", element: <Navigate to="/skills/arithmetic-practice" replace /> },
      { path: "missing-number", element: <Navigate to="/skills/missing-number" replace /> },
      { path: "number-bonds", element: <Navigate to="/skills/number-bonds" replace /> },
      { path: "fraction-fun", element: <Navigate to="/skills/fraction-fun" replace /> },
      { path: "money", element: <Navigate to="/skills/money" replace /> },
      { path: "measure", element: <Navigate to="/skills/measure" replace /> },
      { path: "robot-moves", element: <Navigate to="/skills/robot-moves" replace /> },
      { path: "charts", element: <Navigate to="/skills/charts" replace /> },
      { path: "place-value", element: <Navigate to="/skills/place-value" replace /> },
      { path: "rule-zoo", element: <Navigate to="/skills/rule-zoo" replace /> },
      { path: "shapes", element: <Navigate to="/skills/shapes" replace /> },
      { path: "word-builder", element: <Navigate to="/skills/word-builder" replace /> },
      { path: "word-sorter", element: <Navigate to="/skills/word-sorter" replace /> },
      { path: "sentence-builder", element: <Navigate to="/skills/sentence-builder" replace /> },
      { path: "opposite-match", element: <Navigate to="/skills/opposite-match" replace /> },
      { path: "synonym-match", element: <Navigate to="/skills/synonym-match" replace /> },
      { path: "sight-word-pop", element: <Navigate to="/skills/sight-word-pop" replace /> },
      { path: "speed-reader", element: <Navigate to="/skills/speed-reader" replace /> },
      { path: "world-map", element: <Navigate to="/skills/world-map" replace /> },
      { path: "flag-finder", element: <Navigate to="/skills/flag-finder" replace /> },
      { path: "city-spotlight", element: <Navigate to="/skills/city-spotlight" replace /> },
      { path: "find-the-city", element: <Navigate to="/skills/find-the-city" replace /> },
      { path: "solar-system", element: <Navigate to="/skills/solar-system" replace /> },

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
