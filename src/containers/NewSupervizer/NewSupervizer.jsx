import { Alert, Avatar, Container, TextField, Typography } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import LockIcon from '@mui/icons-material/Lock';
import Autocomplete from '@mui/material/Autocomplete';
import { LoadingButton } from '@mui/lab';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createSupervizer, getRegionsList } from '../../features/dataThunk';

const NewSupervizer = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState('');
  const { regionsList, regionsListLoading, createSupervizerLoading } = useAppSelector(
    (state) => state.dataState,
  );

  const [state, setState] = useState({
    username: '',
    password: '',
    hydra_id: '',
    region: '',
    surname: '',
    confirmPassword: '',
  });

  useEffect(() => {
    dispatch(getRegionsList());
  }, [dispatch]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (state.password.trim() === state.confirmPassword.trim()) {
      const userMutation = {
        username: state.username.trim(),
        password: state.password.trim(),
        region: state.region,
        supervizer_hydra_id: state.hydra_id.trim(),
        supervizer_surname: state.surname.trim(),
      };

      await dispatch(createSupervizer(userMutation));
      navigate('/my-applications');
    } else {
      setError('Пароли не совпадают!');
    }
  };


  return (
    <>
      <Container
        className="sign-in"
        component="form"
        maxWidth="xs"
        onSubmit={submitFormHandler}
      >
        <Avatar
          sx={{
            bgcolor: deepPurple[500],
            m: '0 auto',
          }}
        >
          <LockIcon style={{ color: 'white' }} />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            color: '#FFFFFF',
            textAlign: 'center',
          }}
        >
          Новый супервайзер
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
          id="hydra_id"
          name="hydra_id"
          label="Гидра ID"
          variant="outlined"
          value={state.hydra_id}
          onChange={onChange}
          required
        />
        <Autocomplete
          noOptionsText="Не найдено"
          disablePortal
          id="combo-box-demo"
          options={regionsList?.regions || []}
          onChange={(_, value) =>
            onChange({
              target: {
                name: 'region',
                value,
              },
            })
          }
          renderInput={(params) => (
            <TextField {...params} label="Регион" required />
          )}
          loading={regionsListLoading}
        />
        <LoadingButton
          loading={createSupervizerLoading}
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
          }}
          disabled={
            !state.username ||
            !state.surname ||
            !state.password ||
            !state.confirmPassword ||
            !state.hydra_id ||
            !state.region
          }
        >
          Логин
        </LoadingButton>
      </Container>
    </>
  );
};

export default NewSupervizer;