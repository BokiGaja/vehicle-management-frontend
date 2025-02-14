import { Box, Avatar, Typography } from '@mui/material';
import React from 'react';
import VehicleAvatar from "../../assets/icons/vehicle-avatar.svg"; // Replace with actual vehicle icon
import "./styles.css";

interface VehicleInfoCardProps {
    vehicle: Vehicle;
}

interface Vehicle {
    id: number;
    custom_name: string;
    license_plate: string;
    manufacturer: string;
    vin: string;
}

const VehicleInfoCard: React.FC<VehicleInfoCardProps> = ({ vehicle }) => {
    return (
        <Box className="details__card">
          <Avatar
            src={VehicleAvatar}
            className="details__vehicle-image"
          />
          <Box className="details__info">
            <Typography variant="h5" className="details__vehicle-name">
              {vehicle.custom_name}
            </Typography>
            <Typography variant="body2" className="details__vehicle-subtitle">
              {vehicle.license_plate}
            </Typography>
            <Box sx={{
              marginTop: 3
            }}>
              <Box className="details__row">
                <Typography variant="body2" className="details_vehicle-container">
                  <strong>Model</strong> 
                </Typography>
                <Typography variant="body2" className="details_vehicle-info">
                    {vehicle.manufacturer}
                  </Typography>
              </Box>
              <Box className="details__row">
                <Typography variant="body2" className="details_vehicle-container">
                  <strong>VIN </strong> 
                </Typography>
                <Typography variant="body2" className="details_vehicle-info">
                    {vehicle.vin}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
    );
};

export default VehicleInfoCard;