import React from 'react';
import { Tab, Tabs, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useAppSelector } from "../../../app/hooks";

const AddressForm = ({
  state,
  handleChange,
  addressType,
  onAddressTypeChange,
}) => {
  const {
    regions,
    regionsLoading,
    bxRegionsLoading,
    cities,
    citiesLoading,
    districts,
    bxSquares,
    districtsLoading,
    bxSquaresLoading,
    streets,
    streetsLoading,
    houses,
    housesLoading,
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
        loading={regionsLoading || bxRegionsLoading}
        loadingText='Загрузка...'
        renderInput={(params) => <TextField {...params} label='Регион'/>}
      />
      {state?.region && <Autocomplete
        value={state?.city?.name || ''}
        onChange={(_, value) => {
          handleChange({
            target: {
              name: 'city',
              value: cities?.find(city => city?.name === value) || null,
            }
          });
        }}
        options={cities?.map(city => city?.name) || []}
        loading={citiesLoading || bxSquaresLoading}
        loadingText='Загрузка...'
        renderInput={(params) => <TextField {...params} label='Город'/>}
      />}
      {state?.city && <Autocomplete
        value={state?.district?.name || ''}
        onChange={(_, value) => {
          handleChange({
            target: {
              name: 'district',
              value: districts?.find(district => district?.name === value) || null,
            }
          });
        }}
        options={districts?.map(district => district?.name) || []}
        loading={districtsLoading}
        loadingText='Загрузка...'
        renderInput={(params) =>
          <TextField {...params} label='Мкр / Ж-в / Ул. '/>}
      />}
      {state?.district && <>
        {state?.district?.name?.slice(0, 3) !== 'ул.' && <Autocomplete
          value={state?.street?.name || ''}
          onChange={(_, value) => {
            handleChange({
              target: {
                name: 'street',
                value: streets?.find(street => street?.name === value) || null,
              }
            });
          }}
          options={streets?.map(street => street?.name) || []}
          loading={streetsLoading}
          loadingText='Загрузка...'
          renderInput={(params) => <TextField {...params} label='Улица'/>}
        />}
        {state?.street?.name?.slice(0, 2) !== 'д.' && addressType === 'flat' &&
          <Autocomplete
            value={state?.house?.name || ''}
            onChange={(_, value) => {
              handleChange({
                target: {
                  name: 'house',
                  value: (
                    state?.district?.name.slice(0, 3) === 'ул.' ? streets : houses
                  )?.find(house => house?.name === value) || null,
                }
              });
            }}
            options={(
              state?.district?.name.slice(0, 3) === 'ул.' ? streets : houses
            )?.map(house => house?.name) || []}
            loading={housesLoading}
            loadingText='Загрузка...'
            renderInput={(params) => <TextField {...params} label='Дом'/>}
          />}
        {addressType === 'flat' && <>
          <TextField
            label='Подъезд'
            type='number'
            inputProps={{ min: 1 }}
            name='entrance'
            value={state?.entrance}
            onChange={handleChange}
            variant='outlined'
          />
          <TextField
            label='Этаж'
            type='number'
            inputProps={{ min: 1 }}
            name='floor'
            value={state?.floor}
            onChange={handleChange}
            variant='outlined'
          />
          <TextField
            label='Квартира'
            name='apart'
            value={state?.apart}
            onChange={handleChange}
            variant='outlined'
          />
        </>}
      </>}
      {addressType === 'house' && state?.district && <TextField
        label='Дом'
        variant='outlined'
        name='exactAddress'
        value={state?.exactAddress}
        onChange={handleChange}
      />}
      {state?.region && <Autocomplete
        value={state?.district2?.VALUE || ''}
        onChange={(_, value) => {
          handleChange({
            target: {
              name: 'district2',
              value: bxSquares[Object.keys(bxSquares).filter(key => state?.region?.name?.toLowerCase()?.includes(key.toLowerCase()))[0]]?.find(district2 => district2?.VALUE === value) || null,
            }
          });
        }}
        options={bxSquares[Object.keys(bxSquares).filter(key => state?.region?.name?.toLowerCase()?.includes(key.toLowerCase()))[0]]?.map(district2 => district2?.VALUE) || []}
        loading={bxSquaresLoading}
        loadingText='Загрузка...'
        renderInput={(params) => <TextField {...params} label='Наименование локации'/>}
      />}
    </>
  );
};

export default AddressForm;
