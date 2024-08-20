import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableContainer
} from "@mui/material";

const SingleView = ({
  open,
  handleClose,
  label,
  children,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      className='single-view-dialog'
      sx={{
        '& div[role=dialog]': {
          width: '100%',
          m: '0 15px',
          backgroundImage: 'linear-gradient(rgb(255 255 255 / 10%), rgb(255 255 255 / 7%))',
        },
      }}
    >
      <DialogTitle
        id='alert-dialog-title'
        sx={{ p: '10px 20px' }}
      >{label}</DialogTitle>
      <DialogContent sx={{ p: '0 5px 20px' }}>
        <DialogContentText id='alert-dialog-description'>
          <TableContainer component={Paper}>
            <Table
              aria-label='simple table'
            >
              <TableBody sx={{ '& td': { fontSize: '12px!important' } }}>{children}</TableBody>
            </Table>
          </TableContainer>
        </DialogContentText>
      </DialogContent>
      <Button
        variant='outlined'
        onClick={handleClose}
        sx={{ m: '0 10px 10px' }}
      >ОК</Button>
    </Dialog>
  );
};

export default SingleView;