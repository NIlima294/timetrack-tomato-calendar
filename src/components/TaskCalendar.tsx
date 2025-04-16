
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import type { Task } from './TaskList';

interface TaskCalendarProps {
  tasks: Task[];
  onSelectDate: (date: Date | undefined) => void;
  selectedDate?: Date;
}

const TaskCalendar: React.FC<TaskCalendarProps> = ({
  tasks,
  onSelectDate,
  selectedDate,
}) => {
  const taskDates = tasks.reduce((acc: Record<string, number>, task) => {
    if (task.dueDate) {
      const dateStr = task.dueDate.toISOString().split('T')[0];
      acc[dateStr] = (acc[dateStr] || 0) + 1;
    }
    return acc;
  }, {});

  return (
    <Card className="p-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onSelectDate}
        className="pointer-events-auto"
        modifiers={{
          hasTasks: (date) => {
            const dateStr = date.toISOString().split('T')[0];
            return !!taskDates[dateStr];
          },
        }}
        modifiersStyles={{
          hasTasks: {
            fontWeight: 'bold',
            color: '#4F46E5',
          },
        }}
      />
    </Card>
  );
};

export default TaskCalendar;
