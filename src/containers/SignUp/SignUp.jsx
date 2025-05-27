import React, { useEffect, useState } from 'react';
import {
  Alert, Avatar, Container, TextField, Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getSupervisors, signUp } from '../../features/userThunk';
import { LoadingButton } from '@mui/lab';
import LockIcon from '@mui/icons-material/Lock';
import { deepPurple } from '@mui/material/colors';
import './signUp.css';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState('');
  const {
    supervisors,
    supervisorsLoading,
    supervisorsError,
    signUpLoading,
  } = useAppSelector((state) => state.userState);

  useEffect(() => {
    setError(supervisorsError);
  }, [supervisorsError]);

  const [state, setState] = useState({
    username: '', password: '', hydra_id_sales: '', supervizer: '', surname: '', confirmPassword: '', square: "",
  });

  useEffect(() => {
    dispatch(getSupervisors());
  }, [dispatch]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState, [name]: value,
    }));
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (state.password.trim() === state.confirmPassword.trim()) {
      const userMutation = {
        username: state.username.trim(),
        password: state.password.trim(),
        hydra_id_sales: state.username.trim(),
        supervizer: state.supervizer,
        surname: state.surname.trim(),
        square_for_planup: state.square.trim(),
      };

      await dispatch(signUp(userMutation));
      navigate('/my-applications');
    } else {
      setError('Пароли не совпадают!');
    }
  };

  return (<Container
    className="sign-in"
    component="form"
    maxWidth="xs"
    onSubmit={submitFormHandler}
  >
    <Avatar
      sx={{
        bgcolor: deepPurple[500], m: '0 auto',
      }}
    >
      <LockIcon style={{ color: 'white' }} />
    </Avatar>
    <Typography
      component="h1"
      variant="h5"
      sx={{
        color: '#FFFFFF', textAlign: 'center',
      }}
    >
      Регистрация
    </Typography>
    {error && <Alert severity="error">{error}</Alert>}
    <TextField
      id="username"
      name="username"
      label="Логин"
      variant="outlined"
      autoComplete="username"
      value={state.username}
      onChange={onChange}
      required
    />
    <TextField
      id="surname"
      name="surname"
      label="ФИО"
      variant="outlined"
      autoComplete="name"
      value={state.surname}
      onChange={onChange}
      required
    />
    <TextField
      id="password"
      type="password"
      name="password"
      label="Пароль"
      autoComplete="password"
      variant="outlined"
      value={state.password}
      onChange={onChange}
      required
    />
    <TextField
      id="confirmPassword"
      type="password"
      name="confirmPassword"
      autoComplete="confirmPassword"
      label="Подтвердите пароль"
      variant="outlined"
      value={state.confirmPassword}
      onChange={onChange}
      required
    />
    <TextField
      id="hydra_id_sales"
      name="hydra_id_sales"
      label="Гидра ID"
      variant="outlined"
      value={state.hydra_id_sales}
      onChange={onChange}
      required
    />
    <Autocomplete
      noOptionsText="Не найдено"
      disablePortal
      id="combo-box-demo"
      options={supervisors?.map((supervisor) => supervisor.supervizer_surname)}
      onChange={(_, value) => onChange({
        target: {
          name: 'supervizer', value: supervisors?.find((supervisor) => supervisor?.supervizer_surname === value)?.id,
        },
      })}
      renderInput={(params) => (<TextField {...params} label="Супервайзер" required />)}
      loading={supervisorsLoading}
    />
    <TextField
      id="square"
      name="square"
      label="Квадрать"
      variant="outlined"
      value={state.square}
      onChange={onChange}
    />
    <LoadingButton
      loading={signUpLoading}
      type="submit"
      fullWidth
      variant="contained"
      sx={{
        mt: 3, mb: 2,
      }}
      disabled={!state.username || !state.surname || !state.password || !state.confirmPassword || !state.hydra_id_sales || !state.supervizer}
    >
      Сохранить
    </LoadingButton>
  </Container>);
};
export default SignUp;
