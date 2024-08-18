import React, { useCallback, useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  createNeactivka,
  getDataForNewNeactivkaForm
} from "../../features/dataThunk";
import Autocomplete from "@mui/material/Autocomplete";
import '../NewApplication/newApplication.css';
import { resetCreateNeactivkaErrorMessage } from "../../features/dataSlice";
import { LoadingButton } from "@mui/lab";

const NewNeactivka = () => {
  const dispatch = useAppDispatch();
  const {
    neactivkaDistricts,
    neactivkaRegions,
    neactivkaStatuses,
    neactivkaPaymentStatuses,
    neactivkaTariffs,
    neactivkaReasons,
    neactivkaDiscounts,
    neactivkaEquipmentsForFix,
    neactivkaFormDataLoading,
    createNeactivkaLoading,
    createNeactivkaErrorMessage,
  } = useAppSelector(state => state.dataState);
  const [state, setState] = useState({
    additionalPhoneNumber: "1234",
    address: "1234",
    comment: "1234",
    discount: {
      ID: "16996",
      VALUE: "Приведи друга"
    },
    district: {
      ID: "9261",
      VALUE: "Кара-Балта"
    },
    fixEquipment: {
      ID: "11001",
      VALUE: "Медиаконвертер"
    },
    nonActivePaymentStatus: {
      ID: "10127",
      VALUE: "Оплата на руки агенту"
    },
    nonActiveReason: {
      ID: "11802",
      VALUE: "Ждет тв"
    },
    nonActiveStatus: {
      ID: "10124",
      VALUE: "Отказ"
    },
    personalAccount: "1234",
    phoneNumber: "1234",
    region: {
      ID: "4813",
      VALUE: "Чуйская"
    },
    tariff: {
      ID: "1930",
      VALUE: "Sky (790)"
    },
    userName: "test",
    userSirName: "Testov",
  });
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  
  const handleSnackBarClose = useCallback(() => {
    setSnackBarOpen(false);
  }, []);
  
  useEffect(() => {
    if (createNeactivkaErrorMessage) setSnackBarOpen(true);
  }, [createNeactivkaErrorMessage]);
  
  useEffect(() => {
    dispatch(getDataForNewNeactivkaForm());
    return () => {
      handleSnackBarClose();
      dispatch(resetCreateNeactivkaErrorMessage());
    };
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
          'phoneNumber',
          'additionalPhoneNumber',
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
    await dispatch(createNeactivka(state));
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
                value: neactivkaRegions?.find(region => region?.VALUE === value) || null,
              }
            });
          }}
          options={neactivkaRegions?.map(region => region?.VALUE) || []}
          loading={neactivkaFormDataLoading}
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
                value: neactivkaDistricts?.find(district => district?.VALUE === value) || null,
              }
            });
          }}
          options={neactivkaDistricts?.map(district => district?.VALUE) || []}
          loading={neactivkaFormDataLoading}
          loadingText='Загрузка...'
          renderInput={(params) => <TextField {...params} label='Локация'
            required
          />}
        />
        <Autocomplete
          value={state?.nonActiveStatus?.VALUE || ''}
          onChange={(_, value) => {
            handleChange({
              target: {
                name: 'nonActiveStatus',
                value: neactivkaStatuses?.find(nonActiveStatus => nonActiveStatus?.VALUE === value) || null,
              }
            });
          }}
          options={neactivkaStatuses?.map(nonActiveStatus => nonActiveStatus?.VALUE) || []}
          loading={neactivkaFormDataLoading}
          loadingText='Загрузка...'
          renderInput={(params) =>
            <TextField {...params} label='Статус неактивки'
              required
            />}
        />
        <Autocomplete
          value={state?.nonActivePaymentStatus?.VALUE || ''}
          onChange={(_, value) => {
            handleChange({
              target: {
                name: 'nonActivePaymentStatus',
                value: neactivkaPaymentStatuses?.find(nonActivePaymentStatus => nonActivePaymentStatus?.VALUE === value) || null,
              }
            });
          }}
          options={neactivkaPaymentStatuses?.map(nonActivePaymentStatus => nonActivePaymentStatus?.VALUE) || []}
          loading={neactivkaFormDataLoading}
          loadingText='Загрузка...'
          renderInput={(params) =>
            <TextField {...params} label='Статус оплаты неактивки'
              required
            />}
        />
        <TextField
          label='Адрес в формате: ул. Фрунзе 1'
          name='address'
          value={state?.address}
          onChange={handleChange}
          variant='outlined'
          required
        />
        <Autocomplete
          value={state?.tariff?.VALUE || ''}
          onChange={(_, value) => {
            handleChange({
              target: {
                name: 'tariff',
                value: neactivkaTariffs?.find(tariff => tariff?.VALUE === value) || null,
              }
            });
          }}
          options={neactivkaTariffs?.map(tariff => tariff?.VALUE) || []}
          loading={neactivkaFormDataLoading}
          loadingText='Загрузка...'
          renderInput={(params) => <TextField {...params} label='Тариф'
            required
          />}
        />
        <TextField
          label='Имя абонента'
          name='userName'
          value={state?.userName}
          onChange={handleChange}
          variant='outlined'
          required
        />
        <TextField
          label='Фамилия абонента'
          name='userSirName'
          value={state?.userSirName}
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
          label='Основной номер телефона'
          name='phoneNumber'
          onChange={handleChange}
          inputProps={{ maxLength: 9 }}
          helperText={state?.userPhoneNumber && state?.userPhoneNumber?.length < 9 && 'Формат: 700555333'}
          required
        />
        <TextField
          id='outlined-multiline-flexible'
          value={state?.additionalPhoneNumber}
          label='Доп. номер телефона'
          name='additionalPhoneNumber'
          onChange={handleChange}
          inputProps={{ maxLength: 9 }}
          helperText={state?.userAdditionalPhoneNumber && state?.userAdditionalPhoneNumber?.length < 9 && 'Формат: 700555333'}
          required
        />
        <Autocomplete
          value={state?.nonActiveReason?.VALUE || ''}
          onChange={(_, value) => {
            handleChange({
              target: {
                name: 'nonActiveReason',
                value: neactivkaReasons?.find(nonActiveReason => nonActiveReason?.VALUE === value) || null,
              }
            });
          }}
          options={neactivkaReasons?.map(nonActiveReason => nonActiveReason?.VALUE) || []}
          loading={neactivkaFormDataLoading}
          loadingText='Загрузка...'
          renderInput={(params) => <TextField {...params} label='Причина'
            required
          />}
        />
        <Autocomplete
          value={state?.discount?.VALUE || ''}
          onChange={(_, value) => {
            handleChange({
              target: {
                name: 'discount',
                value: neactivkaDiscounts?.find(discount => discount?.VALUE === value) || null,
              }
            });
          }}
          options={neactivkaDiscounts?.map(discount => discount?.VALUE) || []}
          loading={neactivkaFormDataLoading}
          loadingText='Загрузка...'
          renderInput={(params) => <TextField {...params} label='Акция'
            required
          />}
        />
        <Autocomplete
          value={state?.fixEquipment?.VALUE || ''}
          onChange={(_, value) => {
            handleChange({
              target: {
                name: 'fixEquipment',
                value: neactivkaEquipmentsForFix?.find(fixEquipment => fixEquipment?.VALUE === value) || null,
              }
            });
          }}
          options={neactivkaEquipmentsForFix?.map(fixEquipment => fixEquipment?.VALUE) || []}
          loading={neactivkaFormDataLoading}
          loadingText='Загрузка...'
          renderInput={(params) =>
            <TextField {...params} label='Демонтируемое оборудование'
              required
            />}
        />
        <TextField
          id='outlined-multiline-static'
          label='Комментарий'
          name='comment'
          value={state?.comment}
          onChange={handleChange}
          multiline
          minRows={5}
        />
        <div className='new-application-form-btns'>
          <LoadingButton
            type='submit'
            loading={createNeactivkaLoading}
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
          {createNeactivkaErrorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NewNeactivka;