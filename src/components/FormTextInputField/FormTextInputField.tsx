import { Box, Typography, TextField } from '@mui/material';
import React from 'react';
import "./styles.css";

interface FormTextInputFieldProps {
  label: string;
  errors?: {message?: string | undefined };
}

const FormTextInputField: React.FC<FormTextInputFieldProps> = ({ label, errors, ...rest }) => {
  return (
    <Box>
      <Typography 
        variant="body1" 
        className='form_input_field'
        >
        {label}
      </Typography>
      <TextField 
        hiddenLabel 
        variant="filled" 
        {...rest} 
        fullWidth 
        margin="normal" 
        error={!!errors} 
        helperText={errors?.message} 
      />
    </Box>
  );
};

export default FormTextInputField;
