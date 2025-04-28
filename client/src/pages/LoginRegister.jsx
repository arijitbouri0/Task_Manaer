import { useState } from "react";
// import { server } from '../constants/config';
import { useDispatch } from "react-redux";
import { userExist } from '../redux/reducers/auth';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useInputValidation, useStrongPassword } from '6pp';

export default function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const Username = useInputValidation('', { required: true, minLength: 3 });
  const email = useInputValidation('', { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ });
  const Password = useStrongPassword();

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(`http://localhost:5000/api/auth/login`, {
        email: email.value,
        password: Password.value,
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(data);
      dispatch(userExist(data.user));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message || "Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(`http://localhost:5000/api/auth/register`, {
        username: Username.value,
        email: email.value,
        password: Password.value,
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch(userExist(data.user));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message || "Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-600">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        
        {/* Toggle Buttons */}
        <div className="flex justify-around mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`bg-[#f9f9f9] font-semibold ${isLogin ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'} px-[1.2em] py-[0.6em] rounded-[8px] hover:border hover:border-[#646cff] cursor-pointer`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`font-semibold bg-[#f9f9f9] ${!isLogin ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'} px-[1.2em] py-[0.6em] rounded-[8px] hover:border hover:border-[#646cff] cursor-pointer`}
          >
            Register
          </button>
        </div>

        {/* Forms */}
        {isLogin ? (
          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block mb-1 font-semibold">Email</label>
              <input
                type="email"
                value={email.value}
                onChange={email.changeHandler}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Password</label>
              <input
                type="password"
                value={Password.value}
                onChange={Password.changeHandler}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 hover:bg-white border border-transparent hover:border-blue-500 transition duration-300 hover:text-blue-500 text-white py-2 rounded-md font-semibold cursor-pointer"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        ) : (
          <form className="space-y-5" onSubmit={handleRegister}>
            <div>
              <label className="block mb-1 font-semibold">Username</label>
              <input
                type="text"
                value={Username.value}
                onChange={Username.changeHandler}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Choose a username"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Email</label>
              <input
                type="email"
                value={email.value}
                onChange={email.changeHandler}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Password</label>
              <input
                type="password"
                value={Password.value}
                onChange={Password.changeHandler}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Create a password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 hover:bg-white border border-transparent hover:border-blue-500 transition duration-300 hover:text-blue-500 text-white py-2 rounded-md font-semibold cursor-pointer"
              required
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
