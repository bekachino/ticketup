import React, { useCallback, useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import { Alert, Snackbar, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  createZhaloba, getDataForNewZhalobaForm
} from "../../features/dataThunk";
import Autocomplete from "@mui/material/Autocomplete";
import {
  resetCreateZhalobaErrorMessage,
  resetFormSuccess
} from "../../features/dataSlice";
import { LoadingButton } from "@mui/lab";
import '../NewApplication/newApplication.css';
import { useNavigate } from "react-router-dom";

const NewZhaloba = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    zhalobaDistricts,
    zhalobaRegions,
    zhalobaReasons,
    zhalobaFormDataLoading,
    createZhalobaLoading,
    createZhalobaErrorMessage,
    formSuccess,
  } = useAppSelector(state => state.dataState);
  const [state, setState] = useState({
    district: {
      ID: "9261",
      VALUE: "Кара-Балта"
    },
    zhalobaReason: {
      ID: "11802",
      VALUE: "Ждет тв"
    },
    street: 'test address',
    personalAccount: "1234",
    phoneNumber: "707777404",
    region: {
      ID: "4813",
      VALUE: "Чуйская"
    },
    name: "test",
    surname: "testov",
  });
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  
  const handleSnackBarClose = useCallback(() => {
    setSnackBarOpen(false);
  }, []);
  
  useEffect(() => {
    if (createZhalobaErrorMessage) setSnackBarOpen(true);
  }, [createZhalobaErrorMessage]);
  
  useEffect(() => {
    dispatch(getDataForNewZhalobaForm());
    return () => {
      handleSnackBarClose();
      dispatch(resetCreateZhalobaErrorMessage());
    };
  }, [
    dispatch,
    handleSnackBarClose
  ]);
  
  useEffect(() => {
    if (formSuccess) {
      dispatch(resetFormSuccess());
      navigate('/zhaloba-list')
    }
  }, [
    dispatch,
    formSuccess,
    navigate
  ]);
  
  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;
    
    setState(prevState => (
      {
        ...prevState,
        [name]: [
          'phoneNumber',
          'personalAccount',
        ].includes(name) ? formatPhoneNumber(value) : value,
      }
    ));
    
    if (name === 'region') {
      setState(prevState => (
        {
          ...prevState,
          district: null,
        }
      ));
    }
  };
  
  const formatPhoneNumber = (phoneNum) => {
    return phoneNum.replace(/\D/g, '');
  };
  
  const onSubmit = async e => {
    e?.preventDefault();
    await dispatch(createZhaloba(state));
  };
  
  return (
    <div className='new-application'>
      <Box
        component='form'
        onSubmit={onSubmit}
      >
        <Autocomplete
          value={state?.region?.VALUE || ''}
          onChange={(_, value) => {
            handleChange({
              target: {
                name: 'region',
                value: zhalobaRegions?.find(region => region?.VALUE === value) || null,
              }
            });
          }}
          options={zhalobaRegions?.map(region => region?.VALUE) || []}
          loading={zhalobaFormDataLoading}
          loadingText='Загрузка...'
          renderInput={(params) => <TextField {...params} label='Регион'
            required
          />}
        />
        <Autocomplete
          value={state?.district?.VALUE || ''}
          onChange={(_, value) => {
            handleChange({
              target: {
                name: 'district',
                value: zhalobaDistricts?.find(district => district?.VALUE === value) || null,
              }
            });
          }}
          options={zhalobaDistricts?.map(district => district?.VALUE) || []}
          loading={zhalobaFormDataLoading}
          loadingText='Загрузка...'
          renderInput={(params) => <TextField {...params} label='Локация'
            required
          />}
        />
        <TextField
          label='Точный адрес'
          name='street'
          value={state?.street}
          onChange={handleChange}
          variant='outlined'
          required
        />
        <Autocomplete
          value={state?.zhalobaReason?.VALUE || ''}
          onChange={(_, value) => {
            handleChange({
              target: {
                name: 'zhalobaReason',
                value: zhalobaReasons?.find(reason => reason?.VALUE === value) || null,
              }
            });
          }}
          options={zhalobaReasons?.map(reason => reason?.VALUE) || []}
          loading={zhalobaFormDataLoading}
          loadingText='Загрузка...'
          renderInput={(params) => <TextField {...params} label='Причина жалобы'
            required
          />}
        />
        <TextField
          label='Имя абонента'
          name='name'
          value={state?.name}
          onChange={handleChange}
          variant='outlined'
          required
        />
        <TextField
          label='Фамилия абонента'
          name='surname'
          value={state?.surname}
          onChange={handleChange}
          variant='outlined'
          required
        />
        <TextField
          label='Лицевой счёт'
          name='personalAccount'
          value={state?.personalAccount}
          onChange={handleChange}
          variant='outlined'
          required
        />
        <TextField
          id='outlined-multiline-flexible'
          value={state?.phoneNumber}
          label='Номер телефона'
          name='phoneNumber'
          onChange={handleChange}
          inputProps={{ maxLength: 9 }}
          helperText={state?.userPhoneNumber && state?.userPhoneNumber?.length < 9 && 'Формат: 700555333'}
          required
        />
        <div className='new-application-form-btns'>
          <LoadingButton
            type='submit'
            loading={createZhalobaLoading}
            sx={{ width: '100%' }}
            variant='contained'
          >
            Создать
          </LoadingButton>
        </div>
      </Box>
      <Snackbar
        open={snackBarOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity='error'
          variant='filled'
          sx={{ width: '100%' }}
        >
          {createZhalobaErrorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NewZhaloba;