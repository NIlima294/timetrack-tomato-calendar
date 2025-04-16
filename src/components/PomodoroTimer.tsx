
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PlayCircle, PauseCircle, RotateCcw } from 'lucide-react';

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

const PomodoroTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (isBreak) {
        setTimeLeft(WORK_TIME);
        setIsBreak(false);
        setSessions((s) => s + 1);
      } else {
        setTimeLeft(BREAK_TIME);
        setIsBreak(true);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isBreak]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(WORK_TIME);
    setIsBreak(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = isBreak
    ? ((BREAK_TIME - timeLeft) / BREAK_TIME) * 100
    : ((WORK_TIME - timeLeft) / WORK_TIME) * 100;

  return (
    <Card className="p-6 w-full max-w-sm mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">{isBreak ? 'Break Time' : 'Work Time'}</h2>
        <div className="text-4xl font-mono mb-4">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <Progress value={progress} className="mb-4" />
        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTimer}
            className="w-12 h-12"
          >
            {isRunning ? (
              <PauseCircle className="h-6 w-6" />
            ) : (
              <PlayCircle className="h-6 w-6" />
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={resetTimer}
            className="w-12 h-12"
          >
            <RotateCcw className="h-6 w-6" />
          </Button>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          Sessions completed: {sessions}
        </div>
      </div>
    </Card>
  );
};

export default PomodoroTimer;
