import React, { useEffect, useState } from 'react';
import {
  Alert,
  Avatar,
  Container,
  Grid, Link,
  TextField,
  Typography
} from '@mui/material';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getSupervisors, signUp } from "../../features/userThunk";
import { LoadingButton } from "@mui/lab";
import LockIcon from '@mui/icons-material/Lock';
import { deepPurple } from "@mui/material/colors";
import './signUp.css';
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    supervisors,
    supervisorsLoading,
    supervisorsError,
  } = useAppSelector((state) => state.userState);
  const [state, setState] = useState({
    username: '',
    password: '',
  });
  
  useEffect(() => {
    dispatch(getSupervisors());
  }, [dispatch]);
  
  const onChange = (event) => {
    const {
      name,
      value
    } = event.target;
    setState((prevState) => (
      {
        ...prevState,
        [name]: value,
      }
    ));
  };
  
  const submitFormHandler = async (e) => {
    e.preventDefault();
    await dispatch(signUp(state));
    navigate('/my-applications');
  };
  
  return (
    <Container
      className='sign-in'
      component='form'
      maxWidth='xs'
      onSubmit={submitFormHandler}
    >
      <Avatar
        sx={{
          bgcolor: deepPurple[500],
          m: '0 auto'
        }}
      >
        <LockIcon style={{ color: 'white' }}/>
      </Avatar>
      <Typography
        component='h1'
        variant='h5'
        sx={{
          color: '#FFFFFF',
          textAlign: 'center'
        }}
      >
        Регистрация
      </Typography>
      <TextField
        id='username'
        name='username'
        label='Логин'
        variant='outlined'
        value={state.username}
        onChange={onChange}
        required
      />
      <TextField
        id='surname'
        name='surname'
        label='ФИО'
        variant='outlined'
        value={state.surname}
        onChange={onChange}
        required
      />
      <TextField
        id='username'
        type='password'
        name='password'
        label='Пароль'
        variant='outlined'
        value={state.password}
        onChange={onChange}
        required
      />
      <TextField
        id='confirmPassword'
        type='password'
        name='confirmPassword'
        label='Подтвердите пароль'
        variant='outlined'
        value={state.confirmPassword}
        onChange={onChange}
        required
      />
      <TextField
        id='hydra_id_sales'
        name='hydra_id_sales'
        label='Гидра ID'
        variant='outlined'
        value={state.hydra_id_sales}
        onChange={onChange}
        required
      />
      <Autocomplete
        noOptionsText='Не найдено'
        disablePortal
        id='combo-box-demo'
        options={supervisors?.map(supervisor => supervisor.supervizer_surname)}
        onChange={(_, value) => onChange({
          target: {
            name: 'supervizer',
            value: supervisors?.find(supervisor => supervisor?.supervizer_surname === value)?.id
          }
        })}
        renderInput={(params) => <TextField
          {...params}
          label='Супервайзер'
          required
        />}
        loading={supervisorsLoading}
      />
      {supervisorsError && <Alert severity='error'>{supervisorsError}</Alert>}
      <LoadingButton
        type='submit'
        fullWidth
        variant='contained'
        sx={{
          mt: 3,
          mb: 2
        }}
        disabled={!state.username || !state.surname || !state.password || !state.confirmPassword || !state.hydra_id_sales || !state.supervizer}
      >
        Логин
      </LoadingButton>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link href="/sign-in">
            Нет аккаунта? Регистрация
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};
export default SignUp;
