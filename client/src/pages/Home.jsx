import React from 'react';
import Navbar from '../components/Navbar';
import TaskList from '../components/TaskList';
import AddNewTask from '../components/AddNewTask';

const Home = () => { 
  return (
    <div className="w-screen h-screen space-y-2">
      <Navbar />
       <div className="flex justify-center p-4 min-h-screen bg-gray-100">
      <div className="flex flex-col-reverse md:flex-row w-full max-w-6xl gap-6">
        <div className="w-full md:w-2/3">
          <TaskList />
        </div>
        <div className="w-full md:w-1/3">
          <div className="sticky top-4">
            <AddNewTask />
          </div>
        </div>

      </div>
    </div>
    </div>
  );
};

export default Home;
