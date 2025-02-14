import { AppBar, Typography, Box } from "@mui/material";
import { ReactNode } from "react";
import React from "react";
import "./styles.css";

interface LayoutProps {
  title: string;
  children: ReactNode;
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <Box className="layout__container">
      <AppBar position="sticky" className="layout__header">
        <Typography 
          sx={{ fontFamily: "gilroy, sans-serif" }} 
          className="layout__title">
          {title}
        </Typography>
      </AppBar>
      <Box className="layout__children-container">
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
