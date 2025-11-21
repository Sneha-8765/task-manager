import type { Task, User } from '../types';

// Helper functions for localStorage
const storage = {
  getUsers: (): User[] => {
    try {
      const stored = localStorage.getItem('mockUsers');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },
  
  saveUsers: (users: User[]): void => {
    localStorage.setItem('mockUsers', JSON.stringify(users));
  },
  
  getTasks: (): Task[] => {
    try {
      const stored = localStorage.getItem('mockTasks');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },
  
  saveTasks: (tasks: Task[]): void => {
    localStorage.setItem('mockTasks', JSON.stringify(tasks));
  }
};

// Consistent mock users that work across all devices
const consistentMockUsers: User[] = [
  {
    id: '1',
    firstName: 'Mike',
    lastName: 'Johnson',
    username: 'mike',
    email: 'mike@example.com',
    password: 'password123',
    joinDate: new Date().toISOString()
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Wilson', 
    username: 'sarah',
    email: 'sarah@example.com',
    password: 'password123',
    joinDate: new Date().toISOString()
  },
  {
    id: '3',
    firstName: 'Demo',
    lastName: 'User',
    username: 'demo',
    email: 'demo@example.com',
    password: 'demo123',
    joinDate: new Date().toISOString()
  }
];

// Initialize with default data if empty
export const initializeMockData = () => {
  const existingUsers = storage.getUsers();
  const existingTasks = storage.getTasks();
  
  // Add consistent users if they don't exist
  if (existingUsers.length === 0) {
    storage.saveUsers([...consistentMockUsers]);
  } else {
    // Check if any consistent users are missing and add them
    const usersToAdd = consistentMockUsers.filter(consistentUser => 
      !existingUsers.some(user => user.username === consistentUser.username)
    );
    
    if (usersToAdd.length > 0) {
      const updatedUsers = [...existingUsers, ...usersToAdd];
      storage.saveUsers(updatedUsers);
    }
  }
  
  if (existingTasks.length === 0) {
    const defaultTasks: Task[] = [
      {
        id: '1',
        title: 'Complete project proposal',
        description: 'Write and review the project proposal document for client presentation',
        status: 'completed',
        priority: 'high',
        dueDate: '2024-01-20T00:00:00Z',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T14:30:00Z',
        userId: '1',
        tags: ['work', 'urgent']
      },
      {
        id: '2',
        title: 'Design user interface',
        description: 'Create wireframes and mockups for the new dashboard design',
        status: 'in-progress',
        priority: 'high',
        dueDate: '2024-01-25T00:00:00Z',
        createdAt: '2024-01-16T09:00:00Z',
        updatedAt: '2024-01-16T11:00:00Z',
        userId: '1',
        tags: ['design', 'ui/ux']
      },
      {
        id: '3',
        title: 'Set up development environment',
        description: 'Install and configure all necessary tools and dependencies',
        status: 'pending',
        priority: 'medium',
        createdAt: '2024-01-16T14:00:00Z',
        updatedAt: '2024-01-16T14:00:00Z',
        userId: '1',
        tags: ['development', 'setup']
      }
    ];
    storage.saveTasks(defaultTasks);
  }
};

// Export functions to get and update data
export const getMockUsers = (): User[] => storage.getUsers();
export const getMockTasks = (): Task[] => storage.getTasks();

export const saveMockUsers = (users: User[]): void => {
  storage.saveUsers(users);
};

export const saveMockTasks = (tasks: Task[]): void => {
  storage.saveTasks(tasks);
};