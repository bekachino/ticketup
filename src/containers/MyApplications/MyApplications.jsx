import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getApplications } from "../../features/dataThunk";
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
import AddIcon from '@mui/icons-material/Add';
import './myApplications.css';
import { useNavigate } from "react-router-dom";

const MyApplications = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    applications,
    applicationsLoading,
    applicationsError,
  } = useAppSelector((state) => state.dataState);
  const [searchWord, setSearchWord] = useState('');
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  
  useEffect(() => {
    dispatch(getApplications());
  }, [dispatch]);
  
  useEffect(() => {
    if (!!applicationsError) setSnackBarOpen(true);
  }, [applicationsError]);
  
  const applicationsBySearchWord = useCallback(() => {
    return applications.filter(app => app?.hydra_abbon_ls.includes(searchWord) || app?.first_name.toLowerCase().includes(searchWord?.toLowerCase()) || app?.last_name?.toLowerCase().includes(searchWord?.toLowerCase()) || app?.primary_phone.includes(searchWord) || app?.hydra_address?.toLowerCase().includes(searchWord?.toLowerCase()));
  }, [
    applications,
    searchWord
  ]);
  
  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
  };
  
  return (
    <div className='my-applications'>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={snackBarOpen}
        onClose={handleSnackBarClose}
        message={applicationsError}
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
          justifyContent: 'space-between',
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
        />
        <Button
          variant='outlined'
          color='success'
          sx={{ width: '80px' }}
          onClick={() => navigate('/new-application')}
        ><AddIcon/></Button>
      </div>
      <TableContainer
        component={Paper}
        className='table-container'
      >
        <Table
          sx={{ minWidth: 650 }}
          aria-label='simple table'
        >
          {applicationsLoading && <LinearProgress
            color='inherit'
            className='my-applications-progress-bar'
          />}
          <TableHead>
            <TableRow>
              <TableCell
                align='center'
                sx={{ minWidth: '100px' }}
              >Гидра ЛС</TableCell>
              <TableCell
                align='center'
                sx={{ minWidth: '150px' }}
              >ФИО</TableCell>
              <TableCell
                align='center'
                sx={{ minWidth: '130px' }}
              >Номер телефона</TableCell>
              <TableCell
                align='center'
                sx={{ minWidth: '250px' }}
              >Адрес</TableCell>
              <TableCell
                align='center'
                sx={{ minWidth: '130px' }}
              >Статус</TableCell>
              <TableCell
                align='center'
                sx={{ minWidth: '70px' }}
              >ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(
              applicationsBySearchWord() || []
            )?.map((row) => (
              <TableRow
                key={row.id}
              >
                <TableCell align='center'>{row?.hydra_abbon_ls}</TableCell>
                <TableCell align='center'>{`${row?.first_name} ${row?.last_name}`}</TableCell>
                <TableCell align='center'>{row?.primary_phone}</TableCell>
                <TableCell align='center'>{row?.hydra_address}</TableCell>
                <TableCell align='center'>{row?.status}</TableCell>
                <TableCell align='center'>{row?.id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MyApplications;