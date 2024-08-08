import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ViewListIcon from '@mui/icons-material/ViewList';
import PeopleIcon from '@mui/icons-material/People';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from "react";
import './bottomNav.css';
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/usersSlice";

const BottomNav = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(0);
  
  return (
    <Box sx={{ width: 500 }}
      className='bottom-nav'>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          if (newValue === 3) {
            return dispatch(logout());
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
    </Box>
  );
};

export default BottomNav;