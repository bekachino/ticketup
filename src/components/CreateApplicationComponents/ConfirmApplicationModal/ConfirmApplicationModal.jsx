import React, { useMemo } from 'react';
import Box from "@mui/material/Box";
import { Button, Dialog, DialogTitle } from "@mui/material";
import { useAppSelector } from "../../../app/hooks";
import { LoadingButton } from "@mui/lab";
import './confirmApplicationModal.css';

const ConfirmApplicationModal = ({
  state,
  onSubmit,
  confirmModalOpen,
  handleConfirmModalClose,
  addressType,
}) => {
  const { createApplicationLoading } = useAppSelector(state => state.dataState);
  const passport1Url = useMemo(() => state?.passport1 ? URL.createObjectURL(state.passport1) : '', [state?.passport1]);
  const passport2Url = useMemo(() => state?.passport2 ? URL.createObjectURL(state.passport2) : '', [state?.passport2]);
  const locationScreenShotUrl = useMemo(() => state?.locationScreenShot ? URL.createObjectURL(state.locationScreenShot) : '', [state?.locationScreenShot]);
  
  return (
    <Dialog
      className='confirm-application-modal'
      open={confirmModalOpen}
      onClose={handleConfirmModalClose}
      aria-labelledby='Подтвердите данные'
      aria-describedby='Подтвердите данные'
    >
      <DialogTitle
        className='confirm-application-modal-title'
        id='alert-dialog-title'
        sx={{
          p: 0,
          textAlign: 'center'
        }}
      >
        Подтвердите данные
      </DialogTitle>
      <Box className='application-fields'>
        <div className='application-field'>
          <span className='application-field-title'>Регион</span>
          <span className='application-field-value'>{state?.region?.name || '-'}</span>
        </div>
        <div className='application-field'>
          <span className='application-field-title'>Город</span>
          <span className='application-field-value'>{state?.city?.name || '-'}</span>
        </div>
        <div className='application-field'>
          <span className='application-field-title'>Мкр / Ж-в / Улица</span>
          <span className='application-field-value'>{state?.district?.name || '-'}</span>
        </div>
        <div className='application-field'>
          <span className='application-field-title'>Улица</span>
          <span className='application-field-value'>{state?.street?.name || '-'}</span>
        </div>
        <div className='application-field'>
          <span className='application-field-title'>Дом</span>
          <span className='application-field-value'>{state?.house?.name || state?.exactAddress || '-'}</span>
        </div>
        {addressType === 'flat' && <>
          <div className='application-field'>
            <span className='application-field-title'>Подъезд</span>
            <span className='application-field-value'>{state?.entrance?.name || '-'}</span>
          </div>
          <div className='application-field'>
            <span className='application-field-title'>Этаж</span>
            <span className='application-field-value'>{state?.floor?.name || '-'}</span>
          </div>
          <div className='application-field'>
            <span className='application-field-title'>Квартира</span>
            <span className='application-field-value'>{state?.apart?.name || '-'}</span>
          </div>
        </>}
        <div className='application-field'>
          <span className='application-field-title'>Наименование локации</span>
          <span className='application-field-value'>{state?.district2?.VALUE || '-'}</span>
        </div>
        <div className='application-field'>
          <span className='application-field-title'>Статус оплаты</span>
          <span className='application-field-value'>{state?.orderStatus?.VALUE || '-'}</span>
        </div>
        <div className='application-field'>
          <span className='application-field-title'>Установка роутера</span>
          <span className='application-field-value'>{state?.routerInstallationType?.VALUE || '-'}</span>
        </div>
        <div className='application-field'>
          <span className='application-field-title'>Тариф</span>
          <span className='application-field-value'>{state?.tariff?.VALUE || '-'}</span>
        </div>
        <div className='application-field'>
          <span className='application-field-title'>Установка SuperTv</span>
          <span className='application-field-value'>{state?.superTv?.VALUE || '-'}</span>
        </div>
        <div className='application-field'>
          <span className='application-field-title'>Акция</span>
          <span className='application-field-value'>{state?.discount?.VALUE || '-'}</span>
        </div>
        {state?.discount?.VALUE === 'Приведи друга' &&
          <div className='application-field'>
            <span className='application-field-title'>ЛС друга</span>
            <span className='application-field-value'>{state?.discount_ls || '-'}</span>
          </div>}
        <div className='application-field'>
          <span className='application-field-title'>Лицевая сторона паспорта</span>
          <span className='application-field-value'>
            <img
              src={passport1Url}
              alt='Лицевая сторона паспорта'
              loading='lazy'
            />
          </span>
        </div>
        <div className='application-field'>
          <span className='application-field-title'>Обратная сторона паспорта</span>
          <span className='application-field-value'>
            <img
              src={passport2Url}
              alt='Обратная сторона паспорта'
              loading='lazy'
            />
          </span>
        </div>
        <div className='application-field'>
          <span className='application-field-title'>Скриншот локации</span>
          <span className='application-field-value'>
            <img
              src={locationScreenShotUrl}
              alt='Скриншот локации'
              loading='lazy'
            />
          </span>
        </div>
        <div className='application-field'>
          <span className='application-field-title'>Описание</span>
          <span className='application-field-value'>{state?.description || '-'}</span>
        </div>
        <div className='application-field'>
          <span className='application-field-title'>Переход от (провайдер)</span>
          <span className='application-field-value'>{state?.providerFrom?.VALUE || '-'}</span>
        </div>
        <div className='application-field'>
          <span className='application-field-title'>Имя абонента</span>
          <span className='application-field-value'>{state?.username || '-'}</span>
        </div>
        <div className='application-field'>
          <span className='application-field-title'>Фамилия абонента</span>
          <span className='application-field-value'>{state?.userSirName || '-'}</span>
        </div>
        <div className='application-field'>
          <span className='application-field-title'>Основной номер телефона</span>
          <span className='application-field-value'>{state?.userPhoneNumber || '-'}</span>
        </div>
        <div className='application-field'>
          <span className='application-field-title'>Доп. номер телефона</span>
          <span className='application-field-value'>{state?.userAdditionalPhoneNumber || '-'}</span>
        </div>
        <div className='application-field'>
          <span className='application-field-title'>Лицевой счёт домофона</span>
          <span className='application-field-value'>{state?.domoPhone || '-'}</span>
        </div>
      </Box>
      <Box
        className='modal-btns'
      >
        <Button
          variant='outlined'
          onClick={handleConfirmModalClose}
        >
          Изменить данные
        </Button>
        <LoadingButton
          loading={createApplicationLoading}
          variant='contained'
          onClick={onSubmit}
        >
          Подтвердить
        </LoadingButton>
      </Box>
    </Dialog>
  );
};

export default ConfirmApplicationModal;