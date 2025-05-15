import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ViewListIcon from '@mui/icons-material/ViewList';
import PeopleIcon from '@mui/icons-material/People';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SupervisorAccountIcon from '@mui/icons-material/ManageAccounts';
import './bottomNav.css';
import { useLocation, useNavigate } from 'react-router-dom';

const tabs = {
  '/my-applications': 0,
  '/neactivka-list': 1,
  '/zhaloba-list': 2,
  '/sign-up': 3,
  '/create-supervizer': 4,
};

const BottomNav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState();

  useEffect(() => {
    if (currentTab !== tabs[pathname]) {
      setCurrentTab(tabs[pathname]);
    }
  }, [currentTab, pathname]);

  return (
    <Box sx={{ width: 500 }} className="bottom-nav">
      <BottomNavigation
        showLabels
        value={currentTab}
        onChange={(event, newValue) => {
          setCurrentTab(newValue);
        }}
      >
        <BottomNavigationAction
          label="Заявки"
          icon={<ViewListIcon />}
          onClick={() => navigate('/my-applications')}
        />
        <BottomNavigationAction
          label="Неактивка"
          icon={<PeopleIcon />}
          onClick={() => navigate('/neactivka-list')}
        />
        <BottomNavigationAction
          label="Жалобы"
          icon={<ThumbDownAltIcon />}
          onClick={() => navigate('/zhaloba-list')}
        />
        <BottomNavigationAction
          label="Новый пользователь"
          icon={<PersonAddIcon />}
          onClick={() => navigate('/sign-up')}
        />
        <BottomNavigationAction
          label="Новый супервайзер"
          icon={<SupervisorAccountIcon />}
          onClick={() => navigate('/create-supervizer')}
        />
      </BottomNavigation>
    </Box>
  );
};

export default BottomNav;
