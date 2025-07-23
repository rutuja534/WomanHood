import React, { useState } from 'react';
import { Target, Droplet, Activity, Sun, Plus, Trash2, CheckCircle } from 'lucide-react';

interface Goal {
  id: string;
  type: 'water' | 'exercise' | 'sleep' | 'custom';
  title: string;
  target: number;
  current: number;
  unit: string;
  completed: boolean;
}

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      type: 'water',
      title: 'Daily Water Intake',
      target: 8,
      current: 0,
      unit: 'glasses',
      completed: false
    },
    {
      id: '2',
      type: 'exercise',
      title: 'Weekly Exercise',
      target: 150,
      current: 0,
      unit: 'minutes',
      completed: false
    }
  ]);

  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    type: 'custom' as const,
    title: '',
    target: '',
    unit: ''
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'water':
        return <Droplet className="w-6 h-6" />;
      case 'exercise':
        return <Activity className="w-6 h-6" />;
      case 'sleep':
        return <Sun className="w-6 h-6" />;
      default:
        return <Target className="w-6 h-6" />;
    }
  };

  const incrementProgress = (id: string) => {
    setGoals(goals.map(goal => {
      if (goal.id === id && goal.current < goal.target) {
        const newCurrent = goal.current + 1;
        return {
          ...goal,
          current: newCurrent,
          completed: newCurrent >= goal.target
        };
      }
      return goal;
    }));
  };

  const decrementProgress = (id: string) => {
    setGoals(goals.map(goal => {
      if (goal.id === id && goal.current > 0) {
        const newCurrent = goal.current - 1;
        return {
          ...goal,
          current: newCurrent,
          completed: newCurrent >= goal.target
        };
      }
      return goal;
    }));
  };

  const addNewGoal = () => {
    const targetNumber = parseInt(newGoal.target);
    if (newGoal.title && targetNumber > 0) {
      setGoals([...goals, {
        id: Date.now().toString(),
        type: newGoal.type,
        title: newGoal.title,
        target: targetNumber,
        current: 0,
        unit: newGoal.unit,
        completed: false
      }]);
      setShowAddGoal(false);
      setNewGoal({ type: 'custom', title: '', target: '', unit: '' });
    }
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Health Goals</h2>
        <button
          onClick={() => setShowAddGoal(true)}
          className="flex items-center px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Goal
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {goals.map(goal => (
          <div key={goal.id} className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg mr-3 ${
                  goal.completed ? 'bg-green-100 text-green-500' : 'bg-rose-100 text-rose-500'
                }`}>
                  {goal.completed ? <CheckCircle className="w-6 h-6" /> : getIcon(goal.type)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                  <p className="text-sm text-gray-500">
                    Target: {goal.target} {goal.unit}
                  </p>
                </div>
              </div>
              <button
                onClick={() => deleteGoal(goal.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4">
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    goal.completed ? 'bg-green-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {goal.current} of {goal.target} {goal.unit}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => decrementProgress(goal.id)}
                  className="p-1 text-gray-400 hover:text-rose-500 transition-colors"
                >
                  -
                </button>
                <button
                  onClick={() => incrementProgress(goal.id)}
                  className="p-1 text-gray-400 hover:text-rose-500 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add New Goal</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Target</label>
                <input
                  type="number"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                  min="1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Unit</label>
                <input
                  type="text"
                  value={newGoal.unit}
                  onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddGoal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={addNewGoal}
                className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600"
              >
                Add Goal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}