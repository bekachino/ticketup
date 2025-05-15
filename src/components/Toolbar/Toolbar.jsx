import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import { RU_PATHNAMES } from '../../constants';
import './toolbar.css';
import { Button, Grid, Menu, MenuItem, Modal } from '@mui/material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../features/usersSlice';
import PersonIcon from '@mui/icons-material/Person';

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


const AppToolbar = () => {
  const location = useLocation();
  const { user } = useAppSelector((state)=>state.userState);
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    handleClose();
    setOpen(true);
  };
  const handleCloseModal = () => setOpen(false);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }} className="toolbar">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {RU_PATHNAMES[location.pathname]}
          </Typography>
          <Grid>
            <Button
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="info"
              variant={"contained"}
              sx={{
                width: anchorEl ? "100%" : '44px',
                height: '44px',
                minWidth: '0',
                p: "10px",
                borderRadius: '22px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                transition: 'width 200ms ease',
                marginLeft: 'auto',
                gap: '5px',
                "&:hover":{
                  width: '100%',
                },
                '&:not(:hover)': {
                  transitionDelay: '200ms',
                },
                "&:hover > p":{
                  color: 'inherit',
                  opacity: '1',
                  transitionDelay: '0ms',
                },
              }}
            >
              <Typography sx={{
                color: anchorEl ? "inherit" : 'transparent',
                transition: '200ms',
                textWrap: 'nowrap',
                transitionDelay: '200ms'
              }}>
                {user?.surname}
              </Typography>
              <PersonIcon sx={{
                position: 'sticky',
                right: '0',
              }}/>
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleOpen}>Выйти</MenuItem>
            </Menu>
            <Modal
              open={open}
              onClose={handleCloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalStyle}>
                <Typography
                  component="h5"
                  variant="h5"
                  sx={{ mb: 2, textAlign: 'center' }}
                >
                  Выйти из аккаунта?
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ width: '100%' }}
                  onClick={async () => {
                    await dispatch(logout());
                    handleCloseModal();
                  }}
                >
                  Выйти
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ width: '100%', mt: 1}}
                  onClick={async () => {
                    handleCloseModal();
                  }}
                >
                  Отмена
                </Button>
              </Box>
            </Modal>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppToolbar;
