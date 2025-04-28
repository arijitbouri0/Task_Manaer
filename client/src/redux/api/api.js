import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { server } from '../../constants/config'; // Adjust the path to your configuration file

const api = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/` }), // Base URL for the API
  tagTypes: ['Task'], 
  endpoints: (builder) => ({

    getTasks: builder.query({
      query: (status) => ({
        url: 'tasks/', 
        params: { status }, 
        credentials: 'include',
      }),
      providesTags: ['Task'], 
    }),
    createTask: builder.mutation({
      query: (taskData) => ({
        url: 'tasks/',
        method: 'POST',
        body: taskData, 
        credentials: 'include',
      }),
      invalidatesTags: ['Task'], 
    }),


    updateTaskStatus: builder.mutation({
      query: (id) => ({
        url: `tasks/${id}`,
        method: 'PUT',
        credentials: 'include',
      }),
      invalidatesTags: ['Task'], 
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `tasks/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Task'], 
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskStatusMutation,
  useDeleteTaskMutation,
} = api;

export default api;
