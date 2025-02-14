import React from 'react';
import { Button, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import "./styles.css";

type NavigationButtonProps = {
    text: string;
    path: string;
    startIcon?: React.ReactNode;
};

const NavigationButton: React.FC<NavigationButtonProps> = 
({ 
  text, 
  path, 
  startIcon = null, 
...rest  
}) => {
  return (
    <Button
      sx={{ textTransform: "none" }}
      component={Link}
      to={path}
      startIcon={startIcon}
      {...rest}
    >
      <Typography className="navigation_button_label">
        {text}
      </Typography>
    </Button>
  );
};

export default NavigationButton;