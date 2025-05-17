import { useState, useEffect } from 'react';
import { useNoteFilter } from '../context/NoteFilterContext';
import NoteCard from '../components/NoteCard';
import { Note } from '../types';
import { getNotes, updateNote } from '../utils/storage';
import { Trash, History, Trash2 } from 'lucide-react';

export default function TrashPage() {
  const { categories } = useNoteFilter();
  const [trashedNotes, setTrashedNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrashedNotes = () => {
      const allNotes = getNotes();
      const trashed = allNotes.filter(note => note.isTrashed);
      setTrashedNotes(trashed);
      setLoading(false);
    };

    fetchTrashedNotes();
  }, []);

  const handleRestoreNote = (id: string) => {
    updateNote(id, { isTrashed: false });
    setTrashedNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    // Note: You might want to add a success message here
  };

  const handlePermanentDelete = (id: string) => {
    // This is a permanent delete, bypass the isTrashed flag
    const allNotes = getNotes();
    const updatedNotes = allNotes.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setTrashedNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    // Note: You might want to add a success message here
  };

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Trash</h1>
        
        {trashedNotes.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center transition-colors duration-200">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Trash is empty</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Deleted notes will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trashedNotes.map(note => (
              <div key={note.id} className="relative">
                <NoteCard 
                  note={note} 
                  categories={categories}
                  // Disable click to edit for trashed notes
                  // onClick={handleNoteClick}
                />
                 <div className="absolute top-2 right-2 flex gap-2">
                  <button 
                    onClick={() => handleRestoreNote(note.id)}
                    className="p-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                    aria-label="Restore Note"
                  >
                    <History size={16} />
                  </button>
                   <button 
                    onClick={() => handlePermanentDelete(note.id)}
                    className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    aria-label="Delete Permanently"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 