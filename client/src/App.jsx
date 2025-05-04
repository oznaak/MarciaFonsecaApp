import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import CoursesPage from './components/CoursesPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import CourseDetailPage from './components/CourseDetailPage';
import RequireAuth from './components/RequireAuth';
import RequireNoAuth from './components/RequireNoAuth';
import UserDashboard from './components/UserDashboard';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import TermsOfUse from './components/TermsOfUse';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import './styles/App.css';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Navigation />
      <main className="w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
          <Route path="/login" element={<RequireNoAuth><LoginPage /></RequireNoAuth>} />
          <Route path="/register" element={<RequireNoAuth><RegisterPage /></RequireNoAuth>} />
          <Route path="/userDashboard" element={<RequireAuth><UserDashboard /></RequireAuth>} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;