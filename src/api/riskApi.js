import axiosInstance from "./axiosInstance";

export const getRiskAnalysis = async () => {
  const response = await axiosInstance.get("/risk/high-risk-assets");
  return response.data;
};

export const getMaintenanceForecast = async () => {
  const response = await axiosInstance.get("/risk/maintenance-forecast");
  return response.data;
};