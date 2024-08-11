import * as React from 'react';
import { useEffect, useState } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";

const tabs = {
  '/my-applications': 0,
  '/neactivka-list': 1,
  '/zhaloba-list': 2,
};

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
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [currentTab, setCurrentTab] = useState();
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  useEffect(() => {
    if (currentTab !== tabs[pathname]) {
      setCurrentTab(tabs[pathname]);
    }
  }, [currentTab, pathname]);
  
  return (
    <Box sx={{ width: 500 }}
      className='bottom-nav'>
      <BottomNavigation
        showLabels
        value={currentTab}
        onChange={(event, newValue) => {
          if (newValue === 3) {
            return handleOpen();
          }
          setCurrentTab(newValue);
        }}
      >
        <BottomNavigationAction
          label='Заявки'
          icon={<ViewListIcon/>}
          onClick={() => navigate('/my-applications')}
        />
        <BottomNavigationAction
          label='Неактивка'
          icon={<PeopleIcon/>}
          onClick={() => navigate('/neactivka-list')}
        />
        <BottomNavigationAction
          label='Жалобы'
          icon={<ThumbDownAltIcon/>}
          onClick={() => navigate('/zhaloba-list')}
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