import React from 'react';
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import VehicleIcon from "../../assets/icons/vehicle-icon.svg";
import { Link } from "react-router-dom";
import "./styles.css";

interface VehicleListItemCardProps {
    vehicle: Vehicle;
}

interface Vehicle {
    slug: string;
    custom_name: string;
    license_plate: string;
}

const VehicleListItemCard: React.FC<VehicleListItemCardProps> = ({ vehicle }) => {
  return (
    <ListItem
      component={Link}
      to={`/vehicles/${vehicle.slug}`}
      className="home__list-item"
    >
      <ListItemAvatar>
        <Avatar src={VehicleIcon} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="body2" className="home__vehicle-name">
            {vehicle.custom_name}
          </Typography>
        }
        secondary={
          <Typography variant="body2" className="home__vehicle-license">
            {vehicle.license_plate}
          </Typography>
        }
      />
    </ListItem>
    );
};

export default VehicleListItemCard;