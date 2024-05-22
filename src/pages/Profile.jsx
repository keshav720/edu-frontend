import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getUserSubscriptionPlanByUserId } from "../services/userSubscriptionServices";
const Profile = () => {
  const [subscription, setSubscription] = useState(null);
  const { user } = useSelector((state) => state?.auth);
  const userId = user?.id;
  const navigate = useNavigate();

  useEffect(() => {
    getUserSubscriptionPlanByUserId(userId)
      .then((response) => {
        console.log(response);
        setSubscription(response.subscriptionPlan);
      })
      .catch((error) => {
        console.error("Error fetching subscription plans:", error.message);
      });
  }, [userId]);
  const handleClick = async () => {
    try {
      navigate("/user/subscriptions");
    } catch (error) {
      console.error("Error updating Subscription Plan:", error.message);
    }
  };
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4">Subscription Details</h1>
      {subscription ? (
        <div>
          <p>
            <strong>Start Date:</strong>{" "}
            {new Date(subscription.startDate).toLocaleDateString()}
          </p>
          <p>
            <strong>End Date:</strong>{" "}
            {new Date(subscription.endDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Available Courses:</strong> {subscription.availableCourses}
          </p>
        </div>
      ) : (
        <div>No subscription details found.</div>
      )}
      <button
        onClick={handleClick}
        className="bg-orange-500  hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Upgrade Plan
      </button>
    </div>
  );
};

export default Profile;
