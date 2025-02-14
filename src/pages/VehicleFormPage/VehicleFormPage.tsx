import React, { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createVehicle, fetchVehicleBySlug, updateVehicle } from "../../api/vehicleService.ts";
import { useNavigate, useParams } from "react-router-dom";
import { Button, CircularProgress, Autocomplete, Grid2 as Grid, Box, Typography, Alert, AutocompleteRenderInputParams } from "@mui/material";
import { useEffect } from "react";
import Layout from "../../components/Layout/Layout.tsx";
import FormTextInputField from "../../components/FormTextInputField/FormTextInputField.tsx";
import "./styles.css";
import { useSetTitle } from "../../hooks/useSetTitle.ts";
import { ROUTES } from "../../constants/routes.ts";

const vehicleSchema = yup.object({
  custom_name: yup.string().required("Custom name is required"),
  license_plate: yup.string().required("License plate is required"),
  manufacturer: yup.string().required("Manufacturer is required"),
  vin: yup.string().required("VIN is required"),
});

const manufacturers = [
  'Volvo',
  'Scania',
  'Mercedes-Benz',
  'DAF',
  'MAN',
  'Iveco',
  'Kenworth',
  'Peterbilt',
  'Freightliner',
  'Renault'
]

const VehicleFormPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  useSetTitle(slug ? 'Edit vehicle' : 'Add new vehicle');

  const { data: vehicle, isLoading, isError: errorLoadingVehicle } = useQuery({
    queryKey: ["vehicle", slug],
    queryFn: () => fetchVehicleBySlug(slug!),
    enabled: !!slug,
  });

  const { register, handleSubmit, setValue, formState: { errors }, control } = useForm({
    resolver: yupResolver(vehicleSchema),
    defaultValues: { custom_name: "", license_plate: "", manufacturer: "", vin: "" },
  });
  
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    if (vehicle) {
      setValue("custom_name", vehicle.custom_name);
      setValue("license_plate", vehicle.license_plate);
      setValue("manufacturer", vehicle.manufacturer);
      setValue("vin", vehicle.vin);
    }
  }, [vehicle, setValue]);

  const navigateBack = (dataSlug?: string) => 
    navigate((dataSlug || slug) ? 
      ROUTES.VEHICLE_DETAILS_PAGE(dataSlug || slug) : 
      ROUTES.HOME
    );

  const {isPending: isPendingMutation, mutate} = useMutation({
    mutationFn: (data: any) =>
      slug ? updateVehicle(vehicle.id, data) : createVehicle(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      navigateBack(data?.slug)
    },
    onError: (error) => {
      // @ts-ignore
      setServerError(error);
    },
  });  

  const onSubmit = (data: any) => {
    mutate(slug ? { id: vehicle.id, ...data } : data);
  };

  const renderAutocompleteInput = useCallback((params: AutocompleteRenderInputParams) => (
    <FormTextInputField 
      label="Manufacturer" 
      errors={errors?.manufacturer} 
      {...params} 
    />
  ), [])

  if (isLoading) {
    return (
      <Layout title="Loading...">
        <Box className="details__loading">
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  if (errorLoadingVehicle) {
    return (
      <Layout title="Error">
        <Typography variant="h6" color="error" align="center">
          Error loading vehicle details.
        </Typography>
      </Layout>
    );
  }

  return (
    <Layout title={slug ? 'Edit vehicle' : 'Add new vehicle'}>
      <Typography className="page_title">
        {slug ? "Edit Vehicle" : "Add New Vehicle"}
      </Typography>
      {serverError && <Alert severity="error">{serverError}</Alert>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="form_container">
            <Grid container rowSpacing={3} columnSpacing={3}>
              <Grid size={6}>
                <FormTextInputField 
                  label="License Plate" 
                  errors={errors?.license_plate} 
                  {...register("license_plate")} 
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="manufacturer"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      options={manufacturers} 
                      getOptionLabel={(option) => option}
                      onChange={(_, value) => field.onChange(value)}
                      renderInput={renderAutocompleteInput}
                    />
                  )}
                />
              </Grid>
              <Grid size={6}>
                <FormTextInputField label="VIN" errors={errors?.vin} {...register("vin")} />
              </Grid>
              <Grid size={6}>
                <FormTextInputField 
                  label="Custom Name" 
                  errors={errors?.custom_name} 
                  {...register("custom_name")} 
                />
              </Grid>
            </Grid>
          </Box>
          <Box className="buttons_container">
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              disabled={isPendingMutation} 
              sx={{ textTransform: "none" }}
            >
              <Typography variant="body2" className="button_label">
                {isPendingMutation ? "Saving..." : "Save"}
              </Typography>
            </Button>
            <Button 
              variant="text" 
              onClick={() => navigateBack()} 
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
                Cancel
            </Button>
          </Box>
        </form>
    </Layout>
  );
};

export default VehicleFormPage;
