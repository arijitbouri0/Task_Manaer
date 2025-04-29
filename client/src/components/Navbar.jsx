import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { userNotExists } from '../redux/reducers/auth';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch=useDispatch()
  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/auth/logout/`, { withCredentials: true });
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };
  return (
    <div className="w-full flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-xl font-bold">Task Manager</div>
      <div className="flex items-center space-x-4">
        <span>{user.email}</span>
        <button
          onClick={logoutHandler}
          className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
