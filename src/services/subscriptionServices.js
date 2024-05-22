import { axiosInstance } from "../utils/axios";

export const getAllSubscriptionPlans = async () => {
  try {
    const response = await axiosInstance.get("/subscription/",);
    return response.data;
  } catch (error) {
    console.log("Error in get subscription plans", error);
    throw error;
  }
};

export const getSubscriptionPlanById = async (subscriptionId) => {
  try {
    const response = await axiosInstance.get(`/subscription/${subscriptionId}`);
    console.log("response---", response);
    return response.data;
  } catch (error) {
    console.log("Error in get course by id---", error);
    throw error.response.data;
  }
};