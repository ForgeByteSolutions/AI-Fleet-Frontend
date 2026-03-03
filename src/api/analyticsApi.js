import api from "./axiosInstance";

/**
 * UTILIZATION
 */
export const getUtilization = async () => {
  try {
    const response = await api.get("/analytics/utilization");
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to fetch utilization");
  }
};

/**
 * IDLE ASSETS
 */
export const getIdleAssets = async () => {
  try {
    const response = await api.get("/analytics/idle-assets");
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to fetch idle assets");
  }
};

/**
 * DOWNTIME
 */
export const getDowntime = async () => {
  try {
    const response = await api.get("/analytics/downtime");
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to fetch downtime");
  }
};

/**
 * REVENUE IMPACT
 */
export const getRevenueImpact = async () => {
  try {
    const response = await api.get("/analytics/revenue-impact");
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to fetch revenue impact");
  }
};

/**
 * UTILIZATION FORECAST
 */
export const getUtilizationForecast = async () => {
  try {
    const response = await api.get("/analytics/utilization-forecast");
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to fetch utilization forecast");
  }
};