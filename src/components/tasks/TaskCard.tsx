import React from 'react';
import { Edit2, Trash2, Clock, Play, CheckCircle } from 'lucide-react';
import type { Task } from '../../types';
import { Button } from '../ui/Button';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: Task['status']) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onStatusChange
}) => {
  const statusIcons = {
    pending: Clock,
    'in-progress': Play,
    completed: CheckCircle
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
  };

  const StatusIcon = statusIcons[task.status];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
          {task.title}
        </h3>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
          <StatusIcon className="w-3 h-3 mr-1" />
          {task.status.replace('-', ' ')}
        </span>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
        {task.description}
      </p>
      
      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
        <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
        <span>Updated: {new Date(task.updatedAt).toLocaleDateString()}</span>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-1">
          <Button
            variant="secondary"
            size="sm"
            icon={Edit2}
            onClick={() => onEdit(task)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            icon={Trash2}
            onClick={() => onDelete(task.id)}
          >
            Delete
          </Button>
        </div>
        
        <div className="flex space-x-1">
          {task.status !== 'pending' && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onStatusChange(task.id, 'pending')}
            >
              <Clock className="w-3 h-3" />
            </Button>
          )}
          {task.status !== 'in-progress' && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onStatusChange(task.id, 'in-progress')}
            >
              <Play className="w-3 h-3" />
            </Button>
          )}
          {task.status !== 'completed' && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onStatusChange(task.id, 'completed')}
            >
              <CheckCircle className="w-3 h-3" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};