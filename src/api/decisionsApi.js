import axiosInstance from "./axiosInstance";

export const buyVsReallocate = async (projectId) => {
  try {
    const response = await axiosInstance.post(
      "/decisions/buy-vs-reallocate",
      { project_id: projectId }
    );

    return response.data.data; // return only actual decision data
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Decision API failed");
  }
};

export const simulateProject = async (projectId) => {
  try {
    const response = await axiosInstance.post(
      "/decisions/simulate-project",
      { project_id: projectId }
    );

    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Simulation API failed");
  }
};