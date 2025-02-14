import React, { useCallback, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteVehicle, fetchVehicleBySlug } from "../../api/vehicleService.ts";
import Layout from "../../components/Layout/Layout.tsx";
import {
  CircularProgress,
  Typography,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import { useSetTitle } from "../../hooks/useSetTitle.ts";
import "./styles.css";
import { ReactComponent as BackIcon } from "../../assets/icons/back-icon.svg";
import { ReactComponent as PenIcon } from "../../assets/icons/pen.svg";
import VehicleInfoCard from "../../components/VehicleInfoCard/VehicleInfoCard.tsx";
import { ReactComponent as TrashIcon } from "../../assets/icons/trash-icon.svg";
import PrimaryButton from "../../components/Buttons/PrimaryButton/PrimaryButton.tsx";
import { ROUTES } from "../../constants/routes.ts";
import ActionButton from "../../components/Buttons/ActionButton/ActionButton.tsx";
import NavigationButton from "../../components/Buttons/NavigationButton/NavigationButton.tsx";

const VehicleDetailsPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: vehicle, isLoading, isError } = useQuery({
    queryKey: ["vehicle", slug],
    queryFn: () => fetchVehicleBySlug(slug!),
    enabled: !!slug,
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteVehicle(vehicle!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      navigate(ROUTES.HOME);
    },
    onError: (error) => {
      console.error("Error deleting vehicle:", error);
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSetTitle(vehicle?.custom_name ?? "Vehicle Details");

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };

  const confirmDelete = useCallback(() => {
    setOpenDeleteDialog(false);
    deleteMutation.mutate();
  }, [
    setOpenDeleteDialog
  ]);

  const DeleteVehicleDialog = useMemo(() => {
    if (!openDeleteDialog) {
      return null
    }
    return (
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Vehicle</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete <strong>{vehicle.custom_name}</strong>? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">Cancel</Button>
          <Button 
            onClick={confirmDelete} 
            color="error" 
            variant="contained" 
            disabled={deleteMutation.isPending}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
  )}, [
    openDeleteDialog,
    setOpenDeleteDialog,
    vehicle,
    confirmDelete
  ])

  if (isLoading) {
    return (
      <Layout title="Loading...">
        <Box className="details__loading">
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  if (isError || !vehicle) {
    return (
      <Layout title="Error">
        <Typography variant="h6" color="error" align="center">
          Error loading vehicle details.
        </Typography>
      </Layout>
    );
  }

  return (
    <Layout title="Vehicle detail">
      <Box className="details__container">
        <Box className="details__header">
          <Box className="details__row">
            <NavigationButton
              text="Back"
              startIcon={<Box sx={{marginBottom: '2px'}}><BackIcon /></Box>}
              path={ROUTES.HOME}
            />
            <Typography variant="h5" className="details__title">
              {vehicle.license_plate}
            </Typography>
          </Box>
          <Box className="action_buttons_conatiner">
            <PrimaryButton text="Edit" path={`/vehicles/${slug}/edit`} startIcon={<PenIcon />} />
            <ActionButton 
              text="Delete" 
              color="error" 
              startIcon={<TrashIcon />}
              onClick={handleDelete} 
              disabled={deleteMutation.isPending} 
            />
          </Box>
        </Box>
        <VehicleInfoCard vehicle={vehicle} />
        {DeleteVehicleDialog}
      </Box>
    </Layout>
  );
};

export default VehicleDetailsPage;
