import * as React from 'react';
import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Link, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Button, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {logout} from "../../features/usersSlice";
import { RU_PATHNAMES } from "../../constants";
import './toolbar.css';

const AppToolbar = () => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState(false);
  const location = useLocation();
  const userToken = useAppSelector((state) => state.userState.user);
  
  return (
    <Box sx={{ flexGrow: 1 }}
      className='toolbar'>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'
            component='div'
            sx={{ flexGrow: 1 }}>
            {RU_PATHNAMES[location.pathname]}
          </Typography>
          {userToken && <>
            <div className='nav-links-mobile'>
              <IconButton
                size='large'
                edge='start'
                color='inherit'
                aria-label='open drawer'
                sx={{ height: '48px' }}
                onClick={() => setAnchorEl(true)}
              >
                <MenuIcon/>
              </IconButton>
              <Drawer
                anchor='right'
                open={anchorEl}
                onClose={() => setAnchorEl(false)}
                className='mobile-nav-bar'
              >
                <List
                  sx={{
                    width: '250px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onClick={() => setAnchorEl(false)}
                >
                  <Link to='/new-application'>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText primary='Новая заявка'/>
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <Link to='/my-applications'>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText primary='Мои заявки'/>
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <Link to='/neactivka'>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText primary='Новая неактивка'/>
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <Link to='/zhaloba'>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText primary='Новая жалоба'/>
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <Link to='/neactivka-list'>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText primary='Список неактивок'/>
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <Link to='/zhaloba-list'>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText primary='Список жалоб'/>
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <ListItem disablePadding
                    sx={{ marginTop: 'auto' }}>
                    <Button
                      sx={{ width: '100%' }}
                      color='error'
                      onClick={() => dispatch(logout())}>
                      Выйти из аккаунта
                    </Button>
                  </ListItem>
                </List>
              </Drawer>
            </div>
          </>}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppToolbar;