import { axiosInstance } from "../utils/axios";



export const createUserSubscription = async (subscriptionData) => {
  try {
    const response = await axiosInstance.post(`/userSubscription`, subscriptionData);
    return response.data;
  } catch (error) {
    console.log("Error in create course content---",error);

    throw error.response.data;
  }
};
export const getUserSubscriptionPlanByUserId = async (userId) => {
    try {
      const response = await axiosInstance.get(`/userSubscription/${userId}`);
      return response.data;
    } catch (error) {
      console.log("Error in get all courses---",error);
      throw error.response.data;
    }
  };
  export const updateUserSubscriptionPlan = async (userId) => {
    try {
        const response = await axiosInstance.put(`/userSubscription/${userId}`);

      return response.data;
    } catch (error) {
      console.log("Error in create course content---",error);
  
      throw error.response.data;
    }
  };
  export const updateUserSubscriptionPlanIncrease = async (data) => {
    try {

        const response = await axiosInstance.put(`/userSubscription/${data?.userId}/increase`,data);

      return response.data;
    } catch (error) {
      console.log("Error in create course content---",error);
  
      throw error.response.data;
    }
  };