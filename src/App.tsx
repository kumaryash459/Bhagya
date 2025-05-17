import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
          <Header toggleSidebar={toggleSidebar} />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar isOpen={sidebarOpen} categories={[]} />
            <main className="flex-1 overflow-hidden">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/new" element={<NewNotePage />} />
                <Route path="/edit/:id" element={<EditNotePage />} />
                <Route path="/trash" element={<TrashPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
              </Routes>
            </main>
          </div>
          {/* Footer with Copyright */}
          <footer className="bg-gray-100 dark:bg-gray-800 text-center p-4 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
            © {new Date().getFullYear()} NoteMaster. All rights reserved.
          </footer>
        </div>
        </NoteFilterProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
