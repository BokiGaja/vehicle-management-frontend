import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchVehicles } from "../../api/vehicleService.ts";
import {
  List, CircularProgress,
  Typography,
  Box
} from "@mui/material";
import { useCallback, useEffect, useMemo, useRef } from "react";
import Layout from "../../components/Layout/Layout.tsx";
import "./styles.css";
import { useSetTitle } from "../../hooks/useSetTitle.ts";
import VehicleListItemCard from "../../components/VehicleListItemCard/VehicleListItemCard.tsx";
import PrimaryButton from "../../components/Buttons/PrimaryButton/PrimaryButton.tsx";

const HomePage = () => {
  useSetTitle("Vehicle list");
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, isLoading } =
    useInfiniteQuery({
      queryKey: ["vehicles"],
      queryFn: fetchVehicles,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.hasMore ? allPages.length + 1 : undefined,
    });

  const vehicles = useMemo(() => data?.pages.flatMap((group) => group.vehicles) ?? [], [data]);

  const renderVehicles = useCallback(() => {
    return vehicles.map((vehicle) => 
      <VehicleListItemCard key={vehicle.id} vehicle={vehicle}  />
    );
  }, [vehicles]);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) fetchNextPage();
    });

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) {
    return (
      <Layout title="Loading...">
        <Box className="details__loading">
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout title="Error">
        <Typography variant="h6" color="error" align="center">
          Error loading vehicle details.
        </Typography>
      </Layout>
    );
  }

  return (
    <Layout title="Vehicle list">
      <div className="home__header">
        <Typography className="home__title">Vehicles</Typography>
        <PrimaryButton text="+ New vehicle" path="/vehicles/new" />
      </div>
      <List className="home__list">{renderVehicles()}</List>
      <div ref={observerRef} className="home__observer" />
      {isFetchingNextPage && <CircularProgress />}
    </Layout>
  );
};

export default HomePage;
