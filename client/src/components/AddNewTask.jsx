import React, { useState } from 'react';
import { useCreateTaskMutation } from '../redux/api/api';
import { toast } from 'react-hot-toast';

const AddNewTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [createTask] = useCreateTaskMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, description, priority };
    try {
        await createTask(newTask).unwrap();
        toast.success('Task added successfully!');
        setTitle('');
        setDescription('');
        setPriority('Low');
    } catch (error) {
      toast.error(error.message||'Failed to add task. Please try again.');
    }
}

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="priority">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
          rows={4}
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 cursor-pointer"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddNewTask
