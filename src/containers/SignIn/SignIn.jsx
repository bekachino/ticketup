import React, { useEffect, useState } from 'react';
import {
  Alert, Avatar, Box, Container, Grid, TextField, Typography
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { signIn } from "../../features/userThunk";
import { Link, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import LockIcon from '@mui/icons-material/Lock';
import { deepPurple } from "@mui/material/colors";
import './signIn.css';

const SignIn = () => {
  const dispatch = useAppDispatch();
  const {
    signInError, signInLoading
  } = useAppSelector((state) => state.userState);
  const [state, setState] = useState({
    username: '', password: '',
  });
  
  const onChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => (
      {
        ...prevState, [name]: value,
      }
    ));
  };
  
  const submitFormHandler = async (e) => {
    e.preventDefault();
    dispatch(signIn(state));
  };
  
  return (
    <Container className='sign-in'
      component='form'
      maxWidth='xs'>
      <Avatar sx={{ bgcolor: deepPurple[500], m: 'auto' }}>
        <LockIcon style={{ color: 'white' }}/>
      </Avatar>
      <Typography component='h1'
        variant='h5'
        sx={{ color: '#FFFFFF', textAlign: 'center' }}>
        Вход в систему
      </Typography>
      <TextField id='username'
        name='username'
        label='Имя пользователя'
        variant='outlined'
        value={state.username}
        onChange={onChange}/>
      <TextField id='username'
        type='password'
        name='password'
        label='Пароль'
        variant='outlined'
        value={state.password}
        onChange={onChange}/>
      {signInError && <Alert severity='error'>{signInError}</Alert>}
      <LoadingButton
        type='submit'
        fullWidth
        variant='contained'
        sx={{ mt: 3, mb: 2 }}
        disabled={!state.username || !state.password}
        loading={signInLoading}
      >
        Логин
      </LoadingButton>
    </Container>
  );
};
export default SignIn;
