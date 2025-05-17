import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Note, Category } from '../types';
import { getNotes, getCategories } from '../utils/storage';

interface NoteFilterContextType {
  notes: Note[];
  categories: Category[];
  searchQuery: string;
  selectedCategory: string;
  filteredNotes: Note[];
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (categoryId: string) => void;
  loading: boolean;
  isShowingFavorites: boolean;
  setIsShowingFavorites: (show: boolean) => void;
  refreshNotes: () => void;
}

const NoteFilterContext = createContext<NoteFilterContextType | undefined>(undefined);

export const NoteFilterProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [isShowingFavorites, setIsShowingFavorites] = useState(false);

  const fetchData = () => {
    const fetchedNotes = getNotes();
    const fetchedCategories = getCategories();
    
    setNotes(fetchedNotes);
    setCategories(fetchedCategories);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || note.category === selectedCategory;
    
    // Exclude trashed notes from the main list
    const isNotTrashed = !note.isTrashed;

    // Filter by favorites if isShowingFavorites is true
    const matchesFavorite = isShowingFavorites ? note.isFavorite : true; 

    return matchesSearch && matchesCategory && isNotTrashed && matchesFavorite;
  });

  // Function to refresh notes from storage
  const refreshNotes = () => {
    setLoading(true);
    fetchData();
  };

  return (
    <NoteFilterContext.Provider value={{
      notes,
      categories,
      searchQuery,
      selectedCategory,
      filteredNotes,
      setSearchQuery,
      setSelectedCategory,
      loading,
      isShowingFavorites,
      setIsShowingFavorites,
      refreshNotes
    }}>
      {children}
    </NoteFilterContext.Provider>
  );
};

export const useNoteFilter = () => {
  const context = useContext(NoteFilterContext);
  if (context === undefined) {
    throw new Error('useNoteFilter must be used within a NoteFilterProvider');
  }
  return context;
}; 