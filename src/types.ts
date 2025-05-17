export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isTrashed?: boolean;
  isPublic?: boolean;
  isFavorite?: boolean;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}
