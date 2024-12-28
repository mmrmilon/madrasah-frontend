import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

interface Student {
  studentId?: string;
  registrationId?: string;
  name: string;
  dateofbirth: string;
  email: string;
  contact: string;
  identificationnumber: string;
  nationality: string;
  enrollmentyear: string;
  isactive: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Get token from state
      const token = (getState() as RootState).global.token;
      
      // Add authorization header if token exists
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  reducerPath: "api",
  tagTypes: ["Auth", "Students"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    getStudents: builder.query<Student[], void>({
      query: () => ({
        url: '/students',
        method: 'GET',
      }),
      providesTags: ['Students'],
    }),

    getStudentById: builder.query<Student, string>({
      query: (id) => ({
        url: `/students/${id}`,
        method: 'GET',
      }),
      providesTags: ['Students'],
    }),

    addStudent: builder.mutation<Student, Partial<Student>>({
      query: (student) => ({
        url: '/students',
        method: 'POST',
        body: student,
      }),
      invalidatesTags: ['Students'],
    }),

    updateStudent: builder.mutation<Student, { id: string; student: Partial<Student> }>({
      query: ({ id, student }) => ({
        url: `/students/${id}`,
        method: 'PUT',
        body: student,
      }),
      invalidatesTags: ['Students'],
    }),

    deleteStudent: builder.mutation<void, string>({
      query: (id) => ({
        url: `/students/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Students'],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetStudentsQuery,
  useGetStudentByIdQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = api;