import { axiosInstance } from "../utils/axios";

export const createPayment = async (paymentData) => {
  try {
    const response = await axiosInstance.post("/payment/",paymentData);
    return response;
  } catch (error) {
    console.log("Error in get payment", error);

    throw error;
  }
};

export const createSubscription = async (paymentData) => {
  try {
    const response = await axiosInstance.post("/payment/subscription-payment",paymentData);
    return response;
  } catch (error) {
    console.log("Error in get payment", error);

    throw error;
  }
};
