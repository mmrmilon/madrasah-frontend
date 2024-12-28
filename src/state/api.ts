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

interface Textbook {
    bookId?: string; 
    name: string;
    description: string;
    authorName: string;
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
  tagTypes: ["Auth", "Students", "Textbooks"],
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

    fetchAllTextbooks: builder.query<Textbook[], void>({
      query: () => '/alltextbooks',
      providesTags: ['Textbooks'],
    }),

    addTextbook: builder.mutation<Textbook, Partial<Textbook>>({
      query: (textbook) => ({
        url: '/textbooks',
        method: 'POST',
        body: textbook,
      }),
      invalidatesTags: ['Textbooks'],
    }),

    editTextbook: builder.mutation<Textbook, { id: string; textbook: Partial<Textbook> }>({
      query: ({ id, textbook }) => ({
        url: `/textbooks/${id}`,
        method: 'PUT',
        body: textbook,
      }),
      invalidatesTags: ['Textbooks'],
    }),

    deleteTextbook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/textbooks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Textbooks'],
    }),

    fetchTextbookById: builder.query<Textbook, string>({
      query: (id) => `/textbooks/${id}`,
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
  useFetchAllTextbooksQuery,
  useAddTextbookMutation,
  useEditTextbookMutation,
  useDeleteTextbookMutation,
  useFetchTextbookByIdQuery,
} = api;

export default api;