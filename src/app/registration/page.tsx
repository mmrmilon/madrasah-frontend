"use client";
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../auth/authActions';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { redirect } from 'next/navigation'
import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material';

const Register = () => {
  const dispatch = useAppDispatch();
  //const navigate = useNavigate();
  //const { loading, error } = useAppSelector((state) => state.auth);
  const [error] = useState("");
  const [loading] = useState("");
  const [passwordError, setPasswordError] = useState(''); // Error for mismatched passwords


  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword:''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setPasswordError(''); // Clear password error as user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();

     // Check if passwords match
     if (formData.password !== formData.confirmPassword) {
        setPasswordError('Passwords do not match');
        return;
      }
    dispatch(registerUser(formData)).then((action) => {
        console.log(action)
      if (action.meta.requestStatus === 'fulfilled') {
        //redirect('/login')
        //navigate('/login')
      }
    })
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        User Registration
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="User Name"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
          />
           <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            required
            error={!!passwordError} // Highlight field if there's an error
            helperText={passwordError} // Show error message
          />
          {loading ? (
            <CircularProgress />
          ) : (
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          )}
          {error && <Alert severity="error">{error}</Alert>}
        </Box>
      </form>
    </Container>
  );
};

export default Register;