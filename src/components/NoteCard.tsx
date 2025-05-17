import { format } from 'date-fns';
import { Note, Category } from '../types';
import { Star } from 'lucide-react';
import { updateNote } from '../utils/storage';
import { useNoteFilter } from '../context/NoteFilterContext';

interface NoteCardProps {
  note: Note;
  categories: Category[];
  onClick?: (id: string) => void;
}

export default function NoteCard({ note, categories, onClick }: NoteCardProps) {
  const category = categories.find(c => c.id === note.category);
  const truncatedContent = note.content.length > 150 
    ? note.content.substring(0, 150) + '...' 
    : note.content;
  
  const formattedDate = format(new Date(note.updatedAt), 'MMM d, yyyy');

  const { refreshNotes } = useNoteFilter();

  return (
    <div 
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer p-4"
      onClick={() => onClick && onClick(note.id)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white line-clamp-1">{note.title}</h3>
        {category && (
          <div 
            className="text-xs px-2 py-1 rounded-full" 
            style={{ 
              backgroundColor: `${category.color}20`, 
              color: category.color 
            }}
          >
            {category.name}
          </div>
        )}
      </div>
      
      <div className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
        {truncatedContent}
      </div>
      
      <div className="flex justify-between items-center mt-3">
        <div className="text-xs text-gray-500">
          {formattedDate}
        </div>
        
        <button 
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            console.log('Toggle favorite for note:', note.id);
            
            updateNote(note.id, { isFavorite: !note.isFavorite });
            
            refreshNotes();
          }}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label={note.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Star size={16} fill={note.isFavorite ? 'currentColor' : 'none'} className={note.isFavorite ? 'text-yellow-500' : 'text-gray-400'} />
        </button>

        {note.tags.length > 0 && (
          <div className="flex gap-1">
            {note.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
            {note.tags.length > 2 && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                +{note.tags.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
