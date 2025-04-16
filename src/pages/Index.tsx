import React, { useState } from 'react';
import TaskList, { Task } from '@/components/TaskList';
import PomodoroTimer from '@/components/PomodoroTimer';
import TaskCalendar from '@/components/TaskCalendar';

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete project proposal',
      completed: false,
      priority: 'high',
      dueDate: new Date(2025, 3, 20),
    },
    {
      id: '2',
      title: 'Review documentation',
      completed: false,
      priority: 'medium',
      dueDate: new Date(2025, 3, 18),
    },
    {
      id: '3',
      title: 'Update dependencies',
      completed: true,
      priority: 'low',
      dueDate: new Date(2025, 3, 17),
    },
  ]);

  const handleToggleTask = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const [selectedDate, setSelectedDate] = useState<Date>();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Task Tracker</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 space-y-8">
            <TaskList tasks={tasks} onToggleTask={handleToggleTask} />
            <PomodoroTimer />
          </div>
          
          <div className="md:col-span-4">
            <TaskCalendar
              tasks={tasks}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
