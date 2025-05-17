import { Menu, Moon, Plus, Search, Settings, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-3 px-4 flex items-center justify-between transition-colors duration-200">
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">NoteMaster</h1>
      </div>
      
      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full py-2 pl-10 pr-4 bg-gray-100 dark:bg-gray-700 border-none rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-white transition-colors duration-200"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={() => navigate('/new')}
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg transition-colors"
        >
          <Plus size={16} />
          <span>New Note</span>
        </button>
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mr-2"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={20} className="text-gray-200" /> : <Moon size={20} />}
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <Settings size={20} className="dark:text-gray-200" />
        </button>
      </div>
    </header>
  );
}
