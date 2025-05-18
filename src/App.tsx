import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignIn, SignUp, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import './index.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import NewNotePage from './pages/NewNotePage';
import EditNotePage from './pages/EditNotePage';
import TrashPage from './pages/TrashPage';
import FavoritesPage from './pages/FavoritesPage';
import { getCategories } from './utils/storage';
import { Category } from './types';
import { ThemeProvider } from './context/ThemeContext';
import { NoteFilterProvider } from './context/NoteFilterContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Load Google fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider>
      <Router>
        <NoteFilterProvider>
          <div className="fixed inset-0 flex flex-col dark:bg-gray-900 transition-colors duration-200" style={{ fontFamily: 'Inter, sans-serif' }}>
            <SignedIn>
              <Header toggleSidebar={toggleSidebar} />
              <div className="flex flex-1 overflow-hidden">
                <Sidebar isOpen={sidebarOpen} categories={[]} />
                <main className="flex-1 overflow-hidden">
                  <Routes>
                    <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                    <Route path="/new" element={<ProtectedRoute><NewNotePage /></ProtectedRoute>} />
                    <Route path="/edit/:id" element={<ProtectedRoute><EditNotePage /></ProtectedRoute>} />
                    <Route path="/trash" element={<ProtectedRoute><TrashPage /></ProtectedRoute>} />
                    <Route path="/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
                  </Routes>
                </main>
              </div>
              <footer className="bg-gray-100 dark:bg-gray-800 text-center p-4 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
                © {new Date().getFullYear()} NoteMaster. All rights reserved.
              </footer>
            </SignedIn>
            <SignedOut>
              <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                  <Routes>
                    <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
                    <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
                    <Route path="*" element={<Navigate to="/sign-in" replace />} />
                  </Routes>
                </div>
              </div>
            </SignedOut>
          </div>
        </NoteFilterProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
