import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { purchaseCourseById } from "../../services/courseServices";
import { useParams, useNavigate } from "react-router-dom";
import { createPayment } from "../../services/paymentServices";
import {
  setLoading,
} from "../../redux/slices/userSlice";
import { useDispatch,useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

const stripePromise = loadStripe("pk_test_51PFrJHSBB0eNgorPRQACov4aPO2pvn8ZdUrcsSvCiO3kPJc4f1D92lB3wuuTudy9kvEv93C3dzaAhvuEjncLTlpb00buOX5HCz");

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const [totalAmount, setTotalAmount] = useState(1);
  const [error, setError] = useState(null);
  const { user,loading } = useSelector((state) => state?.auth);
  const userId = user?.id;
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  console.log("loa--",loading);

  const handlePayment = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    if (!stripe || !elements) {
      dispatch(setLoading(false));
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: user?.name,
        email: user?.email,
      },
    });

    if (error) {
      setError(error.message);
      dispatch(setLoading(false));
      return;
    }

    const response = await createPayment({ totalAmount, userId, paymentMethodId: paymentMethod.id });

    if (response.error) {
      setError(response.error);
      dispatch(setLoading(false));
      return;
    }

    try {
      await purchaseCourseById(userId, courseId);
      navigate("/user/my-courses");
    } catch (error) {
      console.error("Error adding course to user:", error.message);
    }
    finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <form onSubmit={handlePayment} className="flex flex-col items-center">
      <h1 className="text-3xl mb-8">Please Complete payment </h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <input
        type="number"
        placeholder="Enter Amount"
        value={totalAmount}
        onChange={(e) => setTotalAmount(e.target.value)}
        className="mb-2 w-64 px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
      />
      <CardElement className="mb-2 w-64 px-4 py-2 border rounded focus:outline-none focus:border-blue-500" />
      <button
        type="submit"
        className="px-8 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-300"
        disabled={!stripe || loading}
      >
        {loading ? (
          <ClipLoader size={20} color={"#ffffff"} />
        ) : (
          `Pay ${totalAmount} Rs.`
        )}     
         </button>
    </form>
  );
};

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className="flex flex-col items-center justify-center h-screen">
        <CheckoutForm />
      </div>
    </Elements>
  );
};

export default Payment;
