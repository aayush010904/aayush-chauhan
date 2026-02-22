import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AppShell from './components/layout/AppShell';
import PageWrapper from './components/animation/PageWrapper';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ResearchPage from './pages/ResearchPage';
import ResearchDetailPage from './pages/ResearchDetailPage';
import ContactPage from './pages/ContactPage';
import OtherSidePage from './pages/OtherSidePage';
import { SearchProvider } from './context/SearchContext';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
        <Route path="/projects" element={<PageWrapper><ProjectsPage /></PageWrapper>} />
        <Route path="/projects/:slug" element={<PageWrapper><ProjectDetailPage /></PageWrapper>} />
        <Route path="/research" element={<PageWrapper><ResearchPage /></PageWrapper>} />
        <Route path="/research/:slug" element={<PageWrapper><ResearchDetailPage /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
        <Route path="/other-side" element={<PageWrapper><OtherSidePage /></PageWrapper>} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <SearchProvider>
      <AppShell>
        <AnimatedRoutes />
      </AppShell>
    </SearchProvider>
  );
}
