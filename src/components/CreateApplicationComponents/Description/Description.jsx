import React from 'react';
import { TextField } from '@mui/material';

const Description = ({ state, handleChange }) => {
  return (
    <>
      <TextField
        id="outlined-multiline-static"
        label="Описание"
        name="description"
        value={state?.description}
        onChange={handleChange}
        multiline
        minRows={5}
      />
    </>
  );
};

export default Description;
