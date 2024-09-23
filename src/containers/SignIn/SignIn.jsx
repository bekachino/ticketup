import React, { useState } from 'react';
import {
  Alert,
  Avatar,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { signIn } from '../../features/userThunk';
import { LoadingButton } from '@mui/lab';
import LockIcon from '@mui/icons-material/Lock';
import { deepPurple } from '@mui/material/colors';
import './signIn.css';

const SignIn = () => {
  const dispatch = useAppDispatch();
  const { signInError, signInLoading } = useAppSelector(
    (state) => state.userState
  );
  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    dispatch(signIn(state));
  };

  return (
    <Container
      className="sign-in"
      component="form"
      maxWidth="xs"
      onSubmit={submitFormHandler}
    >
      <Avatar sx={{ bgcolor: deepPurple[500], m: '0 auto' }}>
        <LockIcon style={{ color: 'white' }} />
      </Avatar>
      <Typography
        component="h1"
        variant="h5"
        sx={{ color: '#FFFFFF', textAlign: 'center' }}
      >
        Вход в систему
      </Typography>
      <TextField
        id="username"
        name="username"
        label="Имя пользователя"
        variant="outlined"
        value={state.username}
        onChange={onChange}
      />
      <TextField
        id="username"
        type="password"
        name="password"
        label="Пароль"
        variant="outlined"
        value={state.password}
        onChange={onChange}
      />
      {signInError && <Alert severity="error">{signInError}</Alert>}
      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={!state.username || !state.password}
        loading={signInLoading}
      >
        Логин
      </LoadingButton>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link href="/sign-up">Нет аккаунта? Регистрация</Link>
        </Grid>
      </Grid>
    </Container>
  );
};
export default SignIn;
