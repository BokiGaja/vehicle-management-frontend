import React from 'react';
import { Button, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import "./styles.css";

type PrimaryButtonProps = {
    text: string;
    path: string;
    startIcon?: React.ReactNode;
    color?: "primary" | "error";
};

const PrimaryButton: React.FC<PrimaryButtonProps> = 
({ 
  text, 
  path, 
  startIcon = null, 
  color = 'primary', 
...rest  
}) => {
  return (
    <Button
      variant="contained"
      sx={{ textTransform: "none" }}
      color={color}
      component={Link}
      to={path}
      startIcon={startIcon}
      {...rest}
    >
      <Typography variant="body2" className="button_label">
        {text}
      </Typography>
    </Button>
  );
};

export default PrimaryButton;