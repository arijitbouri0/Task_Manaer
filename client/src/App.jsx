import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes ,Navigate} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { userExist, userNotExists } from './redux/reducers/auth';
import { server } from './constants/config'; 
import ProtectRouter from './components/ProtectRouter';

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/LoginRegister"));

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    axios
      .get(`${server}api/auth/`, { withCredentials: true })
      .then(({ data }) => {
        dispatch(userExist(data.data));
      })
      .catch(() => dispatch(userNotExists()));
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}> 
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Home />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={
              <ProtectRouter user={!user} redirect="/">
                <Login />
              </ProtectRouter>
            }
          />
        </Routes>
      </Suspense>
      <Toaster position="top-center" />
    </BrowserRouter>
    </>
  )
}

export default App
