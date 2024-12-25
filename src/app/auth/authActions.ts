import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

// const backendURL =
//   process.env.NODE_ENV !== 'production'
//     ? 'http://127.0.0.1:5000'
//     : import.meta.env.VITE_SERVER_URL

const backendURL = "http://localhost:3001";

export const userLogin = createAsyncThunk(
  'auth/login',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendURL}/auth/login`,
        formData
      )      
      console.log("Login successful:", response.data);
      return response;
    } catch (error) {
      console.log(error.message);
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
);

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backendURL}/user/register`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);