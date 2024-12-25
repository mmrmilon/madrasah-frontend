"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from "@/app/redux";
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    Avatar,
    CssBaseline,
    Grid,
    Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { userLogin } from '../auth/authActions';
import { ActionPathnameNormalizer } from "next/dist/server/future/normalizers/request/action";

const Login = () => {
    const [error, setError] = useState("");

    //const { loading, userInfo } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.username || !formData.password) {
            setError("Both fields are required.");
            return;
        }

        dispatch(userLogin(formData)).then((action) => {
            console.log(action);
            if (action.meta.requestStatus === 'fulfilled') {
               // navigate('/login'); 
               //location.href = '/'
            } 
        })
    }

    return (
        <Container maxWidth="sm">
            <CssBaseline />
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign In
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" gap={2}>
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
                    {error && (
                        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                            {error}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </Container>


    );
};

export default Login;