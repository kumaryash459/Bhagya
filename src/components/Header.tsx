import { Menu, Moon, Plus, Search, Settings, Sun, LogIn, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useNoteFilter } from '../context/NoteFilterContext';
import { UserButton, useUser } from '@clerk/clerk-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, categories } = useNoteFilter();
  const { user } = useUser();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-3 px-4 flex items-center justify-between transition-colors duration-200">
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Toggle Sidebar"
        >
          <Menu size={20} className="text-gray-700 dark:text-gray-200"/>
        </button>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">NoteMaster</h1>
      </div>
      
      <div className="flex-1 flex items-center gap-4 mx-4">
        <div className="relative flex-1 max-w-md group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
          </div>
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-200"
          />
        </div>

        <div className="relative hidden sm:block group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter size={16} className="text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white dark:focus:bg-gray-600 appearance-none transition-all duration-200"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={() => navigate('/new')}
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg transition-colors duration-200"
        >
          <Plus size={16} />
          <span className="hidden sm:block">New Note</span>
        </button>
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={20} className="text-gray-200" /> : <Moon size={20} className="text-gray-700" />}
        </button>
        <button 
          onClick={() => console.log('Settings Clicked')}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label="Settings"
        >
          <Settings size={20} className="dark:text-gray-200" />
        </button>
        <div className="ml-2">
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </div>
    </header>
  );
}
