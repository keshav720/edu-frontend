import React, { useEffect, useState } from "react";
import { getAllSubscriptionPlans } from "../../services/subscriptionServices";
import { useNavigate } from "react-router-dom";

const SubscriptionPlans = () => {
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllSubscriptionPlans()
      .then((response) => {
        setSubscriptionPlans(response.subscriptionPlans);
      })
      .catch((error) => {
        console.error("Error fetching subscription plans:", error.message);
      });
  }, []);

  const handlePurchase = (subscriptionId) => {
    try {
      navigate(`/user/${subscriptionId}/payment-gateway`);
    } catch (error) {
      console.error("Error navigating to payment gateway:", error.message);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 mt-32 justify-center align-item-center">
      {subscriptionPlans.map((plan) => (
        <div
          key={plan.id}
          className="bg-white rounded-lg p-6 shadow-md border border-orange-500"
        >
          <h2 className="text-lg font-semibold">{plan.name}</h2>
          <p className="text-gray-600 mt-2">{plan.description}</p>
          <div className="mt-4">
            <p className="text-gray-700">
              Price: {plan.price} Rs. Duration: {plan.durationMonths} months
            </p>
            <p className="text-gray-700">Max Courses: {plan.maxCourses}</p>
          </div>
          <button
            className="bg-orange-500 text-white-500 px-4 py-2 mt-4 rounded hover:bg-orange-400 hover:text-white"
            onClick={() => handlePurchase(plan.id)}
          >
            Buy Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionPlans;
