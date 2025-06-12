import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import { RU_PATHNAMES } from '../../constants';
import './toolbar.css';
import { Button, Grid, Menu, MenuItem, Modal } from '@mui/material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Lottie from 'lottie-react';
import Animation from '../../assets/profile-animation.json';
import { LoadingButton } from '@mui/lab';
import { postAddresses } from '../../features/dataThunk';
import { logout } from '../../features/userThunk';

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
  const { user, logoutLoading } = useAppSelector((state) => state.userState);
  const { postAddressesLoading } = useAppSelector((state) => state.dataState);
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

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
        <Toolbar
          sx={{
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" component="div">
            {RU_PATHNAMES[location.pathname]}
          </Typography>
          {user?.token ? (
            <Grid
              sx={{
                ml: 'auto',
              }}
            >
              <Button
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="info"
                variant={'outlined'}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                sx={{
                  width: anchorEl || hovered ? '100%' : '44px',
                  height: '44px',
                  minWidth: '0',
                  p: '10px',
                  borderRadius: '22px',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'width 200ms ease',
                  marginLeft: 'auto',
                  gap: '5px',
                  '&:not(:hover)': {
                    transitionDelay: '200ms',
                  },
                }}
              >
                <Typography
                  sx={{
                    color: anchorEl || hovered ? 'inherit' : 'transparent',
                    transition: '200ms',
                    textWrap: 'nowrap',
                    transitionDelay: hovered ? '0ms' : '200ms',
                  }}
                >
                  {user?.surname ? user?.surname : user?.username}
                </Typography>
                <Lottie
                  animationData={Animation}
                  loop={!!anchorEl || hovered}
                  style={{
                    minWidth: '24px',
                    width: '24px',
                    height: '24px',
                    position: 'sticky',
                    right: '0',
                  }}
                />
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
                  <LoadingButton
                    loading={logoutLoading}
                    variant="outlined"
                    color="error"
                    sx={{ width: '100%' }}
                    onClick={async () => {
                      await dispatch(logout());
                      handleCloseModal();
                    }}
                  >
                    Выйти
                  </LoadingButton>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ width: '100%', mt: 1 }}
                    onClick={async () => {
                      handleCloseModal();
                    }}
                  >
                    Отмена
                  </Button>
                </Box>
              </Modal>
            </Grid>
          ) : null}
          {user?.role === 'admin' && (
            <LoadingButton
              variant={'outlined'}
              loading={postAddressesLoading}
              color={'info'}
              onClick={async () => {
                await dispatch(postAddresses());
              }}
              sx={{
                ml: 3,
              }}
            >
              Стянуть адреса
            </LoadingButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppToolbar;
