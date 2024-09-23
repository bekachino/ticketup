import React from 'react';
import Box from '@mui/material/Box';
import { Dialog, DialogTitle } from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
import { LoadingButton } from '@mui/lab';
import './applicationResModal.css';

const ApplicationResModal = ({
  applicationResModalOpen,
  handleApplicationResModalClose,
}) => {
  const { applicationRes } = useAppSelector((state) => state.dataState);

  return (
    <Dialog
      className="confirm-application-modal"
      open={applicationResModalOpen}
      onClose={handleApplicationResModalClose}
      aria-labelledby="Подтвердите данные"
      aria-describedby="Подтвердите данные"
    >
      <DialogTitle
        className="confirm-application-modal-title"
        id="alert-dialog-title"
        sx={{
          p: 0,
          textAlign: 'center',
        }}
      >
        Заявка создана
      </DialogTitle>
      <Box className="application-fields">
        <div className="application-field">
          <span className="application-field-title">Лицевой счёт</span>
          <span className="application-field-value">
            {applicationRes?.hydra_ls || '-'}
          </span>
        </div>
        <div className="application-field">
          <span className="application-field-title">Договор</span>
          <span className="application-field-value">
            {applicationRes?.dogovor || '-'}
          </span>
        </div>
      </Box>
      <Box className="modal-btns">
        <LoadingButton
          variant="contained"
          onClick={handleApplicationResModalClose}
        >
          Ок
        </LoadingButton>
      </Box>
    </Dialog>
  );
};

export default ApplicationResModal;
