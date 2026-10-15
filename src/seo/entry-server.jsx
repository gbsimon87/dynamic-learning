import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { AuthContext } from '../context/auth-context';
import { ThemeContext } from '../context/theme-context';
import Navbar from '../components/ui/Navbar';
import AppFooter from '../components/ui/AppFooter';
import Home from '../pages/home/Home';
import SkillsPage from '../pages/skills/SkillsPage';
import SkillGuide from './SkillGuide';
import CurriculumGuide, { CurriculumOverview } from './CurriculumGuide';
import { CURRICULUM_SUBJECTS, loadCurriculum } from '../data/curriculumRegistry';

// Only public, anonymous content is rendered. No auth/store provider is mounted,
// effects never run, and no private database/browser storage is read or written.
export function renderPublicPage(pathname) {
  const page = pathname === '/' ? <Home /> : pathname === '/skills' ? <SkillsPage /> : pathname === '/what-we-teach' ? <CurriculumOverview /> : pathname.startsWith('/curriculum-guide/') ? <CurriculumGuide slug={pathname.slice('/curriculum-guide/'.length)} /> : <SkillGuide slug={pathname.slice('/learn/'.length)} />;
  return renderToString(
    <AuthContext.Provider value={{ child: null, status: 'signedOut' }}>
      <ThemeContext.Provider value={{ theme: 'light', toggleTheme: () => {} }}>
        <StaticRouter location={pathname}>
          <div className="app-layout app-layout--with-footer">
            <a className="skip-link" href="#main-content">Skip to content</a>
            <Navbar />
            <main id="main-content" tabIndex={-1} className="app-layout-main">{page}</main>
            <AppFooter />
          </div>
        </StaticRouter>
      </ThemeContext.Provider>
    </AuthContext.Provider>,
  );
}

// Recognise real dynamic curriculum URLs without changing any gates/unlocks.
export function curriculumPaths() {
  const paths = [];
  for (let year = 1; year <= 6; year += 1) {
    for (const { id: subject } of CURRICULUM_SUBJECTS) {
      paths.push(`/curriculum/year/${year}/${subject}`);
      const curriculum = loadCurriculum(year, subject) ?? [];
      for (const category of curriculum) for (const topic of category.topics) for (const challenge of topic.challenges) {
        paths.push(`/year/${year}/${subject}/problem/${category.id}/${topic.id}/${challenge.id}`);
      }
    }
  }
  return paths;
}
