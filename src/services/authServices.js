import { axiosInstance } from "../utils/axios";
export const signUp = async (userData) => {
    try {
      const response = await axiosInstance.post('/auth/signup', userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  
  export const login = async (userData) => {
    try {
      const response = await axiosInstance.post('/auth/login', userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };