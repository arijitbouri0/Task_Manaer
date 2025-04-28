import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth';
import api from './api/api';

const store = configureStore({
    reducer: {
        auth: authReducer,
        [api.reducerPath]: api.reducer // 
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(),api.middleware]
});

export default store;