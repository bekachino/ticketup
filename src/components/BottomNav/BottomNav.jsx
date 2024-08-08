import * as React from 'react';
import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/usersSlice";
import Box from '@mui/material/Box';
import { Button, Modal } from "@mui/material";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ViewListIcon from '@mui/icons-material/ViewList';
import PeopleIcon from '@mui/icons-material/People';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from "@mui/material/Typography";
import './bottomNav.css';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -60%)',
  width: '90%',
  maxWidth: 400,
  bgcolor: '#222222',
  color: '#FFFFFF',
  p: '20px 35px',
  borderRadius: '12px',
};

const BottomNav = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <Box sx={{ width: 500 }}
      className='bottom-nav'>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          if (newValue === 3) {
            return handleOpen();
          }
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label='Заявки'
          icon={<ViewListIcon/>}
        />
        <BottomNavigationAction
          label='Неактивка'
          icon={<PeopleIcon/>}
        />
        <BottomNavigationAction
          label='Жалобы'
          icon={<ThumbDownAltIcon/>}
        />
        <BottomNavigationAction
          label='Выйти'
          icon={<LogoutIcon/>}
        />
      </BottomNavigation>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={modalStyle}>
          <Typography component='h5'
            variant='h5'
            sx={{ mb: 2, textAlign: 'center' }}>Выйти из системы?</Typography>
          <Button variant='outlined'
            color='error'
            sx={{ width: '100%' }}
            onClick={() => dispatch(logout())}>Выйти</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default BottomNav;