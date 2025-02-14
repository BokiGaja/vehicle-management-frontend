import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.tsx";
import VehicleDetailPage from "./pages/VehicleDetailsPage/VehicleDetailPage.tsx";
import VehicleFormPage from "./pages/VehicleFormPage/VehicleFormPage.tsx";
import "./styles/fonts.css";
import { ROUTES } from "./constants/routes.ts";


const App = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.VEHICLE_DETAILS_PAGE()} element={<VehicleDetailPage />} />
      <Route path={ROUTES.NEW_VEHICLE} element={<VehicleFormPage />} />
      <Route path={ROUTES.VEHICLE_EDIT()} element={<VehicleFormPage />} />
    </Routes>
  );
};

export default App;
