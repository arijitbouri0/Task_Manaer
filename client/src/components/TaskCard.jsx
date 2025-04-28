import React, { useState } from 'react';
import { useDeleteTaskMutation, useUpdateTaskStatusMutation } from '../redux/api/api';
import toast from 'react-hot-toast';

const TaskCard = ({ task }) => {
  const [status, setStatus] = useState(task.status);
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const handleDelete = async (id) => {
    try {
        await deleteTask(id).unwrap();
        toast.success('Task deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete task. Please try again.'|error.message);
      }
  }

  const handleStatusChange = async(id) => {
    const newStatus = status === 'incomplete' ? 'complete' : 'incomplete'; 
    setStatus(newStatus);
    try{
       await updateTaskStatus(id).unwrap() 
       toast.success('Task status updated successfully!');
    }catch(error){
        toast.error('Failed to update task status. Please try again.'|error.message);
    }
    
  };

  return (
    <div className="border p-4 rounded-md mb-4 shadow-md">
      <h3 className="text-xl font-semibold">{task.title}</h3>
      <p className="text-gray-700">{task.description}</p>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-2">
        <span className={`px-3 py-1 rounded-full text-white ${
            status === 'complete' ? 'bg-blue-500' : 'bg-green-500'
          }`}>
            {status}
          </span>
          <button
            onClick={()=>handleStatusChange(task._id)}
            className="bg-gray-500 text-white px-3 py-1 rounded cursor-pointer"
          >
            Change Status
          </button>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleDelete(task._id)}
            className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-600 transition duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
