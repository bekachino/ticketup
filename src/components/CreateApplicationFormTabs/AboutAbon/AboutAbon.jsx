import React from 'react';
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useAppSelector } from "../../../app/hooks";

const AboutAbon = ({
  state,
  handleChange
}) => {
  const {
    providers
  } = useAppSelector(state => state.dataState);
  
  return (
    <>
      <Autocomplete
        value={state?.providerFrom?.VALUE || ''}
        onChange={(_, value) => {
          handleChange({
            target: {
              name: 'providerFrom',
              value: providers?.find(provider => provider?.VALUE === value) || null,
            }
          });
        }}
        options={providers?.map(provider => provider?.VALUE) || []}
        loadingText='Загрузка...'
        renderInput={(params) =>
          <TextField {...params} label='Переход от (провайдер)'/>}
      />
      <TextField
        label='Имя абонента'
        name='username'
        value={state?.username}
        onChange={handleChange}
        variant='outlined'
      />
      <TextField
        label='Фамилия абонента'
        name='userSirName'
        value={state?.userSirName}
        onChange={handleChange}
        variant='outlined'
      />
      <TextField
        id='outlined-multiline-flexible'
        value={state?.userPhoneNumber}
        label='Основной номер телефона'
        name='userPhoneNumber'
        onChange={handleChange}
        inputProps={{ maxLength: 9 }}
        helperText={state?.userPhoneNumber && state?.userPhoneNumber?.length < 9 && 'Формат: 700555333'}
      />
      <TextField
        id='outlined-multiline-flexible'
        value={state?.userAdditionalPhoneNumber}
        label='Доп. номер телефона'
        name='userAdditionalPhoneNumber'
        onChange={handleChange}
        inputProps={{ maxLength: 9 }}
        helperText={state?.userAdditionalPhoneNumber && state?.userAdditionalPhoneNumber?.length < 9 && 'Формат: 700555333'}
      />
      <TextField
        label='Лицевой счёт домофона'
        name='domoPhone'
        value={state?.domoPhone}
        onChange={handleChange}
        variant='outlined'
      />
    </>
  );
};

export default AboutAbon;