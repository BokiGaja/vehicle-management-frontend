import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import Layout from "../../components/Layout/Layout.tsx";
import "./styles.css"

const NotFoundPage: React.FC = () => {
  return (
    <Layout title="Page Not Found">
      <Box className="notfound__container">
        <Typography variant="h3" className="notfound__title">
          404
        </Typography>
        <Typography variant="h5" className="notfound__subtitle">
          Oops! Page not found.
        </Typography>
        <Typography variant="body2" className="notfound__text">
          The page you are looking for doesn’t exist or has been moved.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          className="notfound__button"
        >
          Go Home
        </Button>
      </Box>
    </Layout>
  );
};

export default NotFoundPage;
