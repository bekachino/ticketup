import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getZhaloba } from "../../features/dataThunk";
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
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import '../MyApplications/myApplications.css';
import SingleView from "../../components/SingleView/SingleView";

const MyZhaloba = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    zhaloba,
    zhalobaLoading,
    zhalobaError,
  } = useAppSelector((state) => state.dataState);
  const [searchWord, setSearchWord] = useState('');
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [singleViewOpen, setSingleViewOpen] = useState(false);
  const [currentZhaloba, setCurrentZhaloba] = useState(null);
  
  useEffect(() => {
    dispatch(getZhaloba());
  }, [dispatch]);
  
  useEffect(() => {
    if (!!zhalobaError) setSnackBarOpen(true);
  }, [zhalobaError]);
  
  const applicationsBySearchWord = useCallback(() => {
    return zhaloba?.filter(zhaloba => zhaloba?.region.toLowerCase().includes(searchWord?.toLowerCase()) || zhaloba?.district.toLowerCase().includes(searchWord?.toLowerCase()) || zhaloba?.street.toLowerCase().includes(searchWord?.toLowerCase()) || zhaloba?.zhaloba_reason.toLowerCase().includes(searchWord?.toLowerCase()) || zhaloba?.personal_account.toLowerCase().includes(searchWord?.toLowerCase()) || zhaloba?.phone_number?.includes(searchWord) || zhaloba?.name.toLowerCase().includes(searchWord?.toLowerCase()) || zhaloba?.surname.toLowerCase().includes(searchWord?.toLowerCase()));
  }, [
    zhaloba,
    searchWord
  ]);
  
  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
  };
  
  const handleSingleViewOpen = (item) => {
    setSingleViewOpen(true);
    setCurrentZhaloba(item);
  };
  
  const handleSingleViewCloe = () => {
    setSingleViewOpen(false);
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
        message={zhalobaError}
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
          color='error'
          sx={{ ml: 'auto' }}
          onClick={() => navigate('/new-zhaloba')}
        >Новая жалоба <ThumbDownAltIcon sx={{ ml: '5px' }}/></Button>
      </div>
      <TableContainer
        component={Paper}
        className='table-container'
      >
        <Table
          sx={{ minWidth: 650 }}
          aria-label='simple table'
        >
          {zhalobaLoading && <LinearProgress
            color='inherit'
            className='my-applications-progress-bar'
          />}
          <TableHead>
            <TableRow>
              <TableCell
                align='center'
                sx={{ minWidth: '180px' }}
              >Причина</TableCell>
              <TableCell
                align='center'
                sx={{ minWidth: '130px' }}
              >Номер телефона</TableCell>
              <TableCell
                align='center'
                sx={{ minWidth: '130px' }}
              >Лицевой счёт</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(
              applicationsBySearchWord() || []
            )?.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => handleSingleViewOpen(row)}
              >
                <TableCell align='center'>{row?.zhaloba_reason}</TableCell>
                <TableCell align='center'>{row?.phone_number}</TableCell>
                <TableCell align='center'>{row?.personal_account}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <SingleView
        open={singleViewOpen}
        handleClose={handleSingleViewCloe}
        label='Просмотр жалобы'
      >
        <TableRow
          sx={{ '&:last-child td, &:last-child th': { border: 0 }, }}
        >
          <TableCell align='left'>ФИО</TableCell>
          <TableCell align='left'>{`${currentZhaloba?.name} ${currentZhaloba?.surname}`}</TableCell>
        </TableRow>
        <TableRow
          sx={{ '&:last-child td, &:last-child th': { border: 0 }, }}
        >
          <TableCell align='left'>Номер телефона</TableCell>
          <TableCell align='left'>{currentZhaloba?.phone_number}</TableCell>
        </TableRow>
        <TableRow
          sx={{ '&:last-child td, &:last-child th': { border: 0 }, }}
        >
          <TableCell align='left'>Регион</TableCell>
          <TableCell align='left'>{currentZhaloba?.region}</TableCell>
        </TableRow>
        <TableRow
          sx={{ '&:last-child td, &:last-child th': { border: 0 }, }}
        >
          <TableCell align='left'>Локация</TableCell>
          <TableCell align='left'>{currentZhaloba?.district}</TableCell>
        </TableRow>
        <TableRow
          sx={{ '&:last-child td, &:last-child th': { border: 0 }, }}
        >
          <TableCell align='left'>Лицевой счёт</TableCell>
          <TableCell align='left'>{currentZhaloba?.personal_account}</TableCell>
        </TableRow>
        <TableRow
          sx={{ '&:last-child td, &:last-child th': { border: 0 }, }}
        >
          <TableCell align='left'>Причина жалобы</TableCell>
          <TableCell align='left'>{currentZhaloba?.zhaloba_reason}</TableCell>
        </TableRow>
        <TableRow
          sx={{ '&:last-child td, &:last-child th': { border: 0 }, }}
        >
          <TableCell align='left'>Агент</TableCell>
          <TableCell align='left'>{currentZhaloba?.agent}</TableCell>
        </TableRow>
      </SingleView>
    </div>
  );
};

export default MyZhaloba;