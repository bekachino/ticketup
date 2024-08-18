import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getNeactivka } from "../../features/dataThunk";
import {
  Button,
  LinearProgress,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PeopleIcon from '@mui/icons-material/People';
import '../MyApplications/myApplications.css';

const MyNeactivka = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    neactivka,
    neactivkaLoading,
    neactivkaError,
  } = useAppSelector((state) => state.dataState);
  const [searchWord, setSearchWord] = useState('');
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  
  useEffect(() => {
    dispatch(getNeactivka());
  }, [dispatch]);
  
  useEffect(() => {
    if (!!neactivkaError) setSnackBarOpen(true);
  }, [neactivkaError]);
  
  const applicationsBySearchWord = useCallback(() => {
    return neactivka.filter(neactivka => neactivka?.first_name.toLowerCase().includes(searchWord?.toLowerCase()) || neactivka?.last_name.toLowerCase().includes(searchWord?.toLowerCase()) || neactivka?.primary_phone?.includes(searchWord) || neactivka?.tariff.toLowerCase().includes(searchWord?.toLowerCase()));
  }, [
    neactivka,
    searchWord
  ]);
  
  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
  };
  
  return (
    <div className='my-applications'>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={snackBarOpen}
        onClose={handleSnackBarClose}
        message={neactivkaError}
        sx={{
          '.MuiSnackbarContent-root': {
            backgroundColor: '#121212',
            color: 'white',
          },
        }}
      />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          padding: '15px',
          width: '100%',
        }}
      >
        <TextField
          label='Поиск...'
          variant='outlined'
          className='search-application'
          value={searchWord}
          onChange={e => setSearchWord(e.target.value)}
          size='small'
          sx={{ flexGrow: 1 }}
        />
        <Button
          className='create-application'
          variant='outlined'
          color='secondary'
          sx={{ ml: 'auto' }}
          onClick={() => navigate('/new-neactivka')}
        >Новый неактивный абонент<PeopleIcon sx={{ ml: '5px' }}/></Button>
      </div>
      <TableContainer
        component={Paper}
        className='table-container'
      >
        <Table
          sx={{ minWidth: 650 }}
          aria-label='simple table'
        >
          {neactivkaLoading && <LinearProgress
            color='inherit'
            className='my-applications-progress-bar'
          />}
          <TableHead>
            <TableRow>
              <TableCell
                align='center'
                sx={{ minWidth: '100px' }}
              >ФИО</TableCell>
              <TableCell
                align='center'
                sx={{ minWidth: '130px' }}
              >Номер телефона</TableCell>
              <TableCell
                align='center'
                sx={{ minWidth: '150px' }}
              >Причина жалобы</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(
              applicationsBySearchWord() || []
            )?.map((row) => (
              <TableRow
                key={row.id}
              >
                <TableCell align='center'>{row?.first_name} {row?.last_name}</TableCell>
                <TableCell align='center'>{row?.primary_phone}</TableCell>
                <TableCell align='center'>{row?.reason}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MyNeactivka;