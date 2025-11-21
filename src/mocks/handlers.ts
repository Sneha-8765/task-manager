import { http, HttpResponse } from 'msw';
import { getMockUsers, getMockTasks, saveMockUsers, saveMockTasks, initializeMockData, getDemoUsers } from './data';
import type { LoginCredentials, RegisterData, CreateTaskData, Task } from '../types';

// Initialize mock data on first load
initializeMockData();

export const handlers = [
  // Mock register endpoint
  http.post('/api/register', async ({ request }) => {
    const userData = await request.json() as RegisterData;
    
    const users = getMockUsers();
    
    // Check if user already exists
    const existingUser = users.find(user => 
      user.username === userData.username || user.email === userData.email
    );
    
    if (existingUser) {
      return HttpResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }
    
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      joinDate: new Date().toISOString()
    };
    
    const updatedUsers = [...users, newUser];
    saveMockUsers(updatedUsers);
    
    const token = 'mock-jwt-token-' + Date.now();
    return HttpResponse.json({
      user: newUser,
      token
    });
  }),

  // Mock login endpoint - This will now ALWAYS work with demo users
  http.post('/api/login', async ({ request }) => {
    const { username, password } = await request.json() as LoginCredentials;
    
    const users = getMockUsers();
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      const token = 'mock-jwt-token-' + Date.now();
      return HttpResponse.json({ 
        user, 
        token 
      });
    }
    
    return HttpResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  }),

  // Force reset demo data endpoint (useful for testing)
  http.post('/api/reset-demo-data', async () => {
    localStorage.removeItem('mockUsers');
    localStorage.removeItem('mockTasks');
    initializeMockData();
    
    return HttpResponse.json({ 
      success: true, 
      message: 'Demo data reset successfully',
      demoUsers: getDemoUsers().map(u => ({ username: u.username, password: u.password }))
    });
  }),

  // Mock tasks endpoints
  http.get('/api/tasks', ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    
    const tasks = getMockTasks();
    const userTasks = tasks.filter(task => task.userId === userId);
    return HttpResponse.json(userTasks);
  }),

  http.post('/api/tasks', async ({ request }) => {
    const taskData = await request.json() as CreateTaskData & { userId?: string };
    const tasks = getMockTasks();
    
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      userId: taskData.userId || '1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: taskData.tags || []
    };
    
    const updatedTasks = [...tasks, newTask];
    saveMockTasks(updatedTasks);
    
    return HttpResponse.json(newTask);
  }),

  http.put('/api/tasks/:id', async ({ request, params }) => {
    const { id } = params;
    const updates = await request.json() as Partial<Task>;
    
    const tasks = getMockTasks();
    const updatedTasks = tasks.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    );
    
    saveMockTasks(updatedTasks);
    
    const updatedTask = updatedTasks.find(task => task.id === id);
    return HttpResponse.json(updatedTask);
  }),

  http.delete('/api/tasks/:id', ({ params }) => {
    const { id } = params;
    
    const tasks = getMockTasks();
    const updatedTasks = tasks.filter(task => task.id !== id);
    saveMockTasks(updatedTasks);
    
    return HttpResponse.json({ success: true });
  }),

  // Mock dashboard stats
  http.get('/api/dashboard/stats', ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    
    const tasks = getMockTasks();
    const userTasks = tasks.filter(task => task.userId === userId);
    
    const stats = {
      totalTasks: userTasks.length,
      pendingTasks: userTasks.filter(task => task.status === 'pending').length,
      inProgressTasks: userTasks.filter(task => task.status === 'in-progress').length,
      completedTasks: userTasks.filter(task => task.status === 'completed').length,
      highPriorityTasks: userTasks.filter(task => task.priority === 'high').length,
    };
    
    return HttpResponse.json(stats);
  }),
];