import { useNavigate } from 'react-router-dom';
import { Archive, Folder, LayoutGrid, Star, Tag, Trash } from 'lucide-react';
import { Category } from '../types';

interface SidebarProps {
  isOpen: boolean;
  categories: Category[];
}

export default function Sidebar({ isOpen, categories }: SidebarProps) {
  const navigate = useNavigate();

  return (
    <aside className={`bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full transition-all duration-300 ${isOpen ? 'w-64' : 'w-0'} overflow-hidden`}>
      <div className="p-4 h-full">
        <nav className="space-y-1">
          <a 
            href="/" 
            className="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <LayoutGrid size={18} />
            <span>All Notes</span>
          </a>
          
          <div className="py-2">
            <div className="px-3 mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Categories
            </div>
            <div className="space-y-1">
              {categories.map(category => (
                <a 
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                  <span>{category.name}</span>
                </a>
              ))}
              <a 
                href="/categories" 
                className="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <Folder size={18} />
                <span>Manage Categories</span>
              </a>
            </div>
          </div>
          
          <div className="py-2">
            <div className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Tags
            </div>
            <a 
              href="/tags" 
              className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-lg"
            >
              <Tag size={18} />
              <span>All Tags</span>
            </a>
          </div>
          
          <div className="pt-4 mt-4 border-t border-gray-200">
            <a 
              href="/favorites" 
              className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-lg"
            >
              <Star size={18} />
              <span>Favorites</span>
            </a>
            <a 
              href="/archived" 
              className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-lg"
            >
              <Archive size={18} />
              <span>Archived</span>
            </a>
            <a 
              href="/trash" 
              className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-lg"
            >
              <Trash size={18} />
              <span>Trash</span>
            </a>
          </div>
        </nav>
      </div>
    </aside>
  );
}
