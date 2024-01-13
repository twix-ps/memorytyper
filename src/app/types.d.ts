export interface WordProps {
  text: string;
  state: 'active' | 'solved' | 'error' | 'awaiting';
  id: number;
  onWordCompletion: () => void;
}

export interface WordData {
  id: number;
  text: string;
  state: 'active' | 'solved' | 'error' | 'awaiting';
}