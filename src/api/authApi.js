import axios from "axios";
import axiosInstance from "./axiosInstance";

export const registerUser = async (data) => {
  const response = await axiosInstance.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (email, password) => {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);

  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/auth/token`,
    formData.toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
};