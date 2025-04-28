import React, { useState } from 'react';
import TaskCard from './TaskCard';
import { useGetTasksQuery } from '../redux/api/api';

const TaskList = () => {
  const [filter, setFilter] = useState('all');

  const { data: tasks = [] } = useGetTasksQuery(filter);

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full h-[calc(100vh-2rem)] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Task List</h2>
        <select
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          className="px-3 py-2 border rounded-md"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
