import React, { lazy, Suspense, useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import { Snackbar } from "@mui/material";
import './newApplication.css';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getLocationsList, getRegions } from "../../features/dataThunk";

const AddressForm = lazy(() => import('../../components/AddressForm/AddressForm'));

const formTabs = [
  'Адрес',
  'Статус заявки',
  'Загрузка фото',
  'Описание',
  'О абоненте'
];

const NewApplication = () => {
  const dispatch = useAppDispatch();
  const {
    locationsFetchErrorMessage
  } = useAppSelector(state => state.dataState);
  const [state, setState] = useState();
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [addressType, setAddressType] = useState('house');
  
  useEffect(() => {
    dispatch(getRegions());
  }, [dispatch]);
  
  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;
    
    setState(prevState => (
      {
        ...prevState,
        [name]: value,
      }
    ));
    
    if (name === 'region') {
      dispatch(getLocationsList({
        addressType: 'cities',
        locationType: addressType,
        parentId: value?.hydra_id
      }))
    }
  };
  
  const handleSnackBarClose = () => setSnackBarOpen(false);
  
  const onAddressTypeChange = value => {
    setAddressType(value);
    setState(prevState => (
      {
        ...prevState,
        region: null,
        city: null,
        district: null,
        street: null,
      }
    ));
  }
  
  return (
    <div className='new-application'>
      <Box
        component='form'
      >
        <Suspense fallback={<></>}>
          <AddressForm
            state={state}
            handleChange={handleChange}
            addressType={addressType}
            onAddressTypeChange={onAddressTypeChange}
          />
        </Suspense>
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={snackBarOpen}
        onClose={handleSnackBarClose}
        message={locationsFetchErrorMessage}
        sx={{
          '.MuiSnackbarContent-root': {
            backgroundColor: '#121212',
            color: 'white',
          },
        }}
      />
    </div>
  );
};

export default NewApplication;