
import { Doubt, DoubtCategory } from '@/types/doubt';
import { v4 as uuidv4 } from '@/lib/uuid';

// Mock data for doubts
export const mockDoubts: Doubt[] = [
  {
    id: '1',
    title: 'How do I understand React Hooks?',
    description: 'I am confused about the concept of hooks in React, especially useEffect. Can someone explain how they work and when to use them?',
    category: 'Technical',
    status: 'resolved',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    title: 'Career path for a frontend developer',
    description: 'What are the best technologies to learn as a frontend developer in 2025? Should I focus on React or try something else?',
    category: 'Career',
    status: 'in-progress',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    title: 'Understanding calculus integration',
    description: 'I\'m struggling with integration by parts in calculus. Could someone provide a step-by-step explanation with examples?',
    category: 'Academic',
    status: 'pending',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    title: 'Best practice for state management',
    description: 'What is the recommended approach for state management in large React applications? Redux, Context API, or something else?',
    category: 'Technical',
    status: 'pending',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    title: 'How to prepare for technical interviews?',
    description: 'I have interviews coming up for software engineering roles. What are the best resources and strategies to prepare?',
    category: 'Career',
    status: 'in-progress',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Service for managing doubts
export const doubtService = {
  getDoubts: () => {
    return Promise.resolve([...mockDoubts]);
  },
  
  getDoubtById: (id: string) => {
    const doubt = mockDoubts.find(d => d.id === id);
    return Promise.resolve(doubt ? { ...doubt } : null);
  },
  
  createDoubt: (doubtData: Omit<Doubt, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newDoubt: Doubt = {
      ...doubtData,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    };
    
    mockDoubts.push(newDoubt);
    return Promise.resolve(newDoubt);
  },
  
  updateDoubt: (id: string, doubtData: Partial<Doubt>) => {
    const index = mockDoubts.findIndex(d => d.id === id);
    if (index === -1) return Promise.reject(new Error('Doubt not found'));
    
    mockDoubts[index] = {
      ...mockDoubts[index],
      ...doubtData,
      updatedAt: new Date().toISOString(),
    };
    
    return Promise.resolve(mockDoubts[index]);
  },
  
  deleteDoubt: (id: string) => {
    const index = mockDoubts.findIndex(d => d.id === id);
    if (index === -1) return Promise.reject(new Error('Doubt not found'));
    
    const deletedDoubt = mockDoubts.splice(index, 1)[0];
    return Promise.resolve(deletedDoubt);
  },
  
  getDoubtsByCategory: (category: DoubtCategory) => {
    return Promise.resolve(mockDoubts.filter(d => d.category === category));
  },
  
  getDoubtsByStatus: (status: 'pending' | 'in-progress' | 'resolved') => {
    return Promise.resolve(mockDoubts.filter(d => d.status === status));
  },
};
