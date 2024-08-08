import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getApplications } from "../../features/dataThunk";
import {
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import './myApplications.css';

const MyApplications = () => {
  const dispatch = useAppDispatch();
  const {
    applications,
    applicationsLoading
  } = useAppSelector((state) => state.dataState);
  
  useEffect(() => {
    dispatch(getApplications());
  }, [dispatch]);
  
  return (
    <div className='my-applications'>
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
                sx={{ minWidth: '120px' }}
              >Гидра ЛС</TableCell>
              <TableCell
                align='center'
                sx={{ minWidth: '180px' }}
              >ФИО</TableCell>
              <TableCell
                align='center'
                sx={{ minWidth: '150px' }}
              >Номер телефона</TableCell>
              <TableCell
                align='center'
                sx={{ minWidth: '250px' }}
              >Адрес</TableCell>
              <TableCell
                align='center'
                sx={{ minWidth: '100px' }}
              >ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='center'>{row?.hydra_abbon_ls}</TableCell>
                <TableCell align='center'>{`${row?.first_name} ${row?.last_name}`}</TableCell>
                <TableCell align='center'>{row?.primary_phone}</TableCell>
                <TableCell align='center'>{row?.hydra_address}</TableCell>
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