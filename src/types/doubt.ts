
export interface Doubt {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'in-progress' | 'resolved';
  createdAt: string;
  updatedAt: string;
  userId?: string;
  assignedTo?: string;
}

export type DoubtCategory = 
  | 'Academic' 
  | 'Technical' 
  | 'Career' 
  | 'General' 
  | 'Other';

export const doubtCategories: DoubtCategory[] = [
  'Academic',
  'Technical',
  'Career',
  'General',
  'Other'
];

export type DoubtStatus = 'pending' | 'in-progress' | 'resolved';

export const doubtStatuses: { value: DoubtStatus; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' }
];
