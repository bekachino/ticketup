import React, { lazy, useCallback, useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import { Alert, Button, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getBxRegions, getBxSquares, getRegions
} from "../../features/dataThunk";
import { resetCreateApplicationErrorMessage } from "../../features/dataSlice";
import './newNeactivka.css';

const NewNeactivka = () => {
  const dispatch = useAppDispatch();
  const {} = useAppSelector(state => state.dataState);
  const [state, setState] = useState(null);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  
  const handleSnackBarClose = useCallback(() => {
    dispatch(resetCreateApplicationErrorMessage());
    setSnackBarOpen(false);
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(getRegions());
    dispatch(getBxRegions());
    dispatch(getBxSquares());
    return () => handleSnackBarClose();
  }, [
    dispatch,
    handleSnackBarClose
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
          'userPhoneNumber',
          'userAdditionalPhoneNumber',
          'domoPhone',
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
  };
  
  return (
    <div className='new-application'>
      <Box
        component='form'
        onSubmit={onSubmit}
      >
        {/*<Autocomplete*/}
        {/*  value={state?.region?.name || ''}*/}
        {/*  onChange={(_, value) => {*/}
        {/*    handleChange({*/}
        {/*      target: {*/}
        {/*        name: 'region',*/}
        {/*        value: regions?.find(region => region?.name === value) || null,*/}
        {/*      }*/}
        {/*    });*/}
        {/*  }}*/}
        {/*  options={regions?.map(region => region?.name) || []}*/}
        {/*  loading={regionsLoading || bxRegionsLoading}*/}
        {/*  loadingText='Загрузка...'*/}
        {/*  renderInput={(params) => <TextField {...params} label='Регион'/>}*/}
        {/*/>*/}
        <div className='new-application-form-btns'>
          <Button
            type='submit'
            variant='contained'
            sx={{ width: '100%' }}
            disabled={false}
          >
            Создать
          </Button>
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
          Error
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NewNeactivka;