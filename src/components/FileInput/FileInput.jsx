import React, { useRef } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const FileInput = ({
  handleImageChange,
  removeImage,
  file,
  label,
  name,
}) => {
  const inputRef = useRef(null);
  
  const onFileChange = e => {
    if (handleImageChange) {
      handleImageChange(e, name);
    }
  };
  
  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  
  return (
    <>
      <input
        type='file'
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={onFileChange}
      />
      <Grid
        container
        direction='row'
        spacing={2}
        alignItems='center'
      >
        <Grid
          item
          xs
        >
          <Box sx={{ color: '#FFFFFF' }}>
            {file ? <Typography>
              <img
                src={URL.createObjectURL(file)}
                alt={label}
                loading='lazy'
                style={{
                  maxWidth: '100px',
                  maxHeight: '65px'
                }}
              />
            </Typography> : label}
          </Box>
        </Grid>
        <Grid
          item
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            alignItems: 'stretch'
          }}
        >
          {!file ? <Button
            variant='contained'
            onClick={activateInput}
            style={{ fontSize: '10px' }}
          >
            Загрузить
          </Button> : <Button
            className='delete-image'
            variant='outlined'
            startIcon={<DeleteIcon sx={{ margin: 0 }}/>}
            onClick={() => {
              if (removeImage && inputRef.current) {
                removeImage(name);
                inputRef.current.value = '';
              }
            }}
            sx={{
              minWidth: '0',
              '.MuiButton-startIcon': {
                margin: 0,
              },
            }}
          />}
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;
