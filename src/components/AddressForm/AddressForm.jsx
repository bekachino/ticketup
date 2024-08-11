import React from 'react';
import { Tab, Tabs, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useAppSelector } from "../../app/hooks";

const AddressForm = ({
  state,
  handleChange,
  addressType,
  onAddressTypeChange,
}) => {
  const {
    regions,
    regionsLoading,
  } = useAppSelector(state => state.dataState);
  
  return (
    <>
      <Tabs
        className='new-application-tabs'
        value={addressType}
        onChange={(_, value) => onAddressTypeChange(value)}
      >
        <Tab
          value='house'
          label='Частный сектор'
        />
        <Tab
          value='flat'
          label='Квартира'
        />
      </Tabs>
      <Autocomplete
        key={addressType}
        value={state?.region?.name || ''}
        onChange={(_, value) => {
          handleChange({
            target: {
              name: 'region',
              value: regions?.find(region => region?.name === value) || null,
            }
          });
        }}
        options={regions?.map(region => region?.name) || []}
        loading={regionsLoading}
        loadingText='Загрузка...'
        renderInput={(params) => <TextField {...params} label='Регион'/>}
      />
    </>
  );
};

export default AddressForm;
