import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/app/redux";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
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

export interface Textbook {
    id?: string; 
    name: string;
    description: string;
    authorName: string;
}

export interface Subject {
  id?: string; 
  name: string;
  code: string;
  description: string;
  credit: number;
  textbookId: string;  
}

interface Batches {
  batchId?: string; 
  year: string;
  session: string;
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
  tagTypes: ["Auth", "Students", "Textbooks", "Subject", "Batches"],
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
       query: () => ({
            url: '/textbooks',
            method: 'GET',
          }),
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

    getSubjects: builder.query<Subject[], void>({
      query: () => ({
           url: '/subjects',
           method: 'GET',
         }),
         providesTags: ['Subject'],
   }),

   addSubject: builder.mutation<Subject, Partial<Subject>>({
     query: (Subject) => ({
       url: '/subjects',
       method: 'POST',
       body: Subject,
     }),
     invalidatesTags: ['Subject'],
   }),

   updateSubject: builder.mutation<Subject, { id: string; subject: Partial<Subject> }>({
     query: ({ id, subject }) => ({
       url: `/subjects/${id}`,
       method: 'PUT',
       body: subject,
     }),
     invalidatesTags: ['Subject'],
   }),

   deleteSubject: builder.mutation<void, string>({
     query: (id) => ({
       url: `/subjects/${id}`,
       method: 'DELETE',
     }),
     invalidatesTags: ['Subject'],
   }),

   fetchSubjectById: builder.query<Subject, string>({
     query: (id) => `/subjects/${id}`,
   }),

    fetchAllBatches: builder.query<Batches[], void>({
      query: () => '/batches',
      providesTags: ['Batches'],
    }),

    addBatch: builder.mutation<Batches, Partial<Batches>>({
      query: (batch) => ({
        url: '/batches',
        method: 'POST',
        body: batch,
      }),
      invalidatesTags: ['Batches'],
    }),

    editBatch: builder.mutation<Batches, { id: string; batch: Partial<Batches> }>({
      query: ({ id, batch }) => ({
        url: `/batches/${id}`,
        method: 'PUT',
        body: batch,
      }),
      invalidatesTags: ['Batches'],
    }),

    deleteBatch: builder.mutation<void, string>({
      query: (id) => ({
        url: `/batches/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Batches'],
    }),

    fetchBatchById: builder.query<Batches, string>({
      query: (id) => `/batches/${id}`,
    })

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
  useGetSubjectsQuery,
  useAddSubjectMutation,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,  
  useFetchSubjectByIdQuery,
  useFetchAllBatchesQuery,
  useAddBatchMutation,
  useEditBatchMutation,
  useDeleteBatchMutation,
} = api;


export default api;