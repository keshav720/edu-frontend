import React, { useState, useEffect } from "react";
import {
  setLoading,
} from "../../redux/slices/userSlice";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { createSubscription } from "../../services/paymentServices";
import { getSubscriptionPlanById } from "../../services/subscriptionServices";
import {
  createUserSubscription,
  getUserSubscriptionPlanByUserId,
  updateUserSubscriptionPlanIncrease,
} from "../../services/userSubscriptionServices";
import { ClipLoader } from "react-spinners";

const stripePromise = loadStripe(
  "pk_test_51PFrJHSBB0eNgorPRQACov4aPO2pvn8ZdUrcsSvCiO3kPJc4f1D92lB3wuuTudy9kvEv93C3dzaAhvuEjncLTlpb00buOX5HCz"
);

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const { subscriptionId } = useParams();
  const [totalAmount, setTotalAmount] = useState();
  const [duration, setDuration] = useState();
  const [error, setError] = useState(null);
  const { user ,loading} = useSelector((state) => state?.auth);
  const userId = user?.id;
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  useEffect(() => {
    getSubscriptionPlanById(subscriptionId)
      .then((response) => {
        setTotalAmount(response?.subscriptionPlan?.price);
        setDuration(response?.subscriptionPlan?.durationMonths);
      })
      .catch((error) => {
        console.error("Error fetching course details:", error.message);
      });
  }, [subscriptionId]);

  const handlePayment = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    if (!stripe || !elements) {
      dispatch(setLoading(false));
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
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

    const response = await createSubscription({
      totalAmount,
      duration,
      userId,
      paymentMethodId: paymentMethod.id,
      subscriptionId,
    });

    if (response.error) {
      setError(response.error);
      dispatch(setLoading(false));
      return;
    }

    try {
      const details = await getSubscriptionPlanById(subscriptionId);
      const maxCourses = details?.subscriptionPlan?.maxCourses;

      const userSubscriptions = await getUserSubscriptionPlanByUserId(userId);

      if (userSubscriptions && userSubscriptions.subscriptionPlan) {
        const subscriptionId =
          userSubscriptions?.subscriptionPlan?.subscriptionId;
        await updateUserSubscriptionPlanIncrease({
          userId,
          maxCourses,
          subscriptionId,
        });
      } else {
        await createUserSubscription({ userId, subscriptionId, maxCourses });
      }

      navigate("/user/profile");
    } catch (error) {
      console.error("Error in buying subscription:", error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <form onSubmit={handlePayment} className="flex flex-col items-center">
      <h1 className="text-3xl mb-8">Please Complete payment </h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <CardElement className="mb-2 w-64 px-4 py-2 border rounded focus:outline-none focus:border-blue-500" />
      <button
        type="submit"
        className="px-8 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-300 flex items-center justify-center"
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

const SubscriptionPayment = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className="flex flex-col items-center justify-center h-screen">
        <CheckoutForm />
      </div>
    </Elements>
  );
};

export default SubscriptionPayment;
