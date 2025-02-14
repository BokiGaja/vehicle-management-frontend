import React from 'react';
import { Button, Typography } from '@mui/material';

type ActionButtonProps = {
    text: string;
    startIcon?: React.ReactNode;
    color?: "primary" | "error";
    onClick: () => void;
    disabled: boolean;
};

const ActionButton: React.FC<ActionButtonProps> = 
({ 
  text, 
  startIcon = null, 
  color = 'primary',
  onClick,
  disabled
}) => {
  return (
    <Button
      variant="contained"
      sx={{ textTransform: "none", marginLeft: 1 }}
      color={color}
      startIcon={startIcon}
      onClick={onClick}
      disabled={disabled}
    >
      <Typography 
        variant="body2" 
        sx={{ fontWeight: 600 }}
      >
        {text}
      </Typography>
  </Button>
  );
};

export default ActionButton;