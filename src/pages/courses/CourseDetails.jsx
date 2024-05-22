import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getCourseById, deleteCourseById, getMyCourseById, purchaseCourseById } from "../../services/courseServices";
import { useNavigate } from "react-router-dom";
import { getCourseContentByCourseId } from "../../services/courseContentServices";
import { useSelector } from "react-redux";
import CourseContentPopup from "./courseContent/CourseContentPopup";
import { getUserSubscriptionPlanByUserId, updateUserSubscriptionPlan } from "../../services/userSubscriptionServices";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [courseContent, setCourseContent] = useState([]);
  const [showContent, setShowContent] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [alreadyPurchased, setAlreadyPurchased] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useSelector((state) => state?.auth);
  const isAdmin = user?.role === "admin";
  const Role = user?.role;
  const userId = user?.id;
  const navigate = useNavigate();

  useEffect(() => {
    getMyCourseById(userId)
      .then((response) => {
        const isCoursePurchased = response?.myCourses.some((course) => course.id === courseId);
        if (isCoursePurchased) {
          setAlreadyPurchased(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching course details:", error.message);
      });
  }, [courseId, userId]);

  useEffect(() => {
    getCourseById(courseId)
      .then((response) => {
        setCourse(response.course);
      })
      .catch((error) => {
        console.error("Error fetching course details:", error.message);
      });
  }, [courseId]);

  const handleDelete = async () => {
    try {
      await deleteCourseById(courseId);
      navigate(`/${Role}/courses`);
    } catch (error) {
      console.error("Error deleting course:", error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      navigate(`/${Role}/courses/${courseId}/update`);
    } catch (error) {
      console.error("Error updating course:", error.message);
    }
  };

  const handlePurchase = async () => {
    try {
      navigate(`/${Role}/courses/${courseId}/payment-gateway`);
    } catch (error) {
      console.error("Error purchasing course:", error.message);
    }
  };

  const handleSubscription = async () => {
    try {
      const details = await getUserSubscriptionPlanByUserId(userId);
      if (details?.subscriptionPlan?.availableCourses > 0) {
        await purchaseCourseById(userId, courseId);
        await updateUserSubscriptionPlan(userId);
        navigate("/user/my-courses");
      } else {
        setErrorMessage('No available courses left in your subscription.');
      }
    } catch (error) {
      console.error("Error handling subscription:", error.message);
      setErrorMessage(error.message);
      console.log(errorMessage);
      
    }
  };

  const handleCreateCourseContent = async () => {
    try {
      navigate(`/${Role}/courses/${courseId}/course-content`);
    } catch (error) {
      console.error("Error creating course content:", error.message);
    }
  };

  const handleContentToggle = async () => {
    try {
      if (!showContent) {
        const response = await getCourseContentByCourseId(courseId);
        setCourseContent(response.courseContent);
      }
      setShowContent(!showContent);
    } catch (error) {
      console.error("Error fetching course content:", error.message);
    }
  };

  const handleContentClick = (content) => {
    setSelectedContent(content);
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div className="bg-white-800 p-4 min-h-screen relative">
      <div className="container mx-auto mt-8">
        <h2 className="text-3xl font-bold text-orange-500 mb-4">{course?.title}</h2>
        <p className="text-orange-500">{course?.description}</p>
        <button
          onClick={handleContentToggle}
          className="text-orange-900 hover:text-orange-700 transition duration-300"
        >
          {showContent ? "Hide Course Content" : "Show Course Content"}
        </button>
        {showContent && (
          <div>
            <h3 className="text-orange mt-4">Course Content:</h3>
            <ul className="text-orange">
              {courseContent ? (
                courseContent.map((content, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleContentClick(content)}
                      className="text-orange-500 hover:text-orange-700 transition duration-300"
                    >
                      {content?.title}
                    </button>
                  </li>
                ))
              ) : (
                <div>Loading course content...</div>
              )}
            </ul>
          </div>
        )}
      </div>
      {selectedContent && (
        <CourseContentPopup content={selectedContent} onClose={() => setSelectedContent(null)} />
      )}
      {showContent && isAdmin && (
        <button
          className="fixed bottom-4 left-4 bg-orange-500 hover:bg-orange-600
          text-white font-bold py-2 px-4 rounded-full 
          focus:outline-none focus:shadow-outline"
          onClick={handleCreateCourseContent}
        >
          Add New Course content
        </button>
      )}
      {isAdmin && (
        <>
          <button
            onClick={handleUpdate}
            className="fixed bg-orange-500 hover:bg-orange-600
            text-white font-bold py-2 px-4 rounded-full 
            focus:outline-none focus:shadow-outline absolute bottom-4 right-40 m-2"
          >
            Update Course
          </button>
          <button
            onClick={handleDelete}
            className="fixed bg-orange-500 hover:bg-orange-600
            text-white font-bold py-2 px-4 rounded-full 
            focus:outline-none focus:shadow-outline absolute bottom-4 right-4 m-2"
          >
            Delete Course
          </button>
        </>
      )}
      {!isAdmin && !alreadyPurchased && (
        <>
          <button
            onClick={handlePurchase}
            className="fixed bg-orange-500 hover:bg-orange-600
            text-white font-bold py-2 px-4 rounded-full 
            focus:outline-none focus:shadow-outline absolute top-4 right-4 m-2"
          >
            Buy Course
          </button>
          <button
            onClick={handleSubscription}
            className="fixed bg-orange-500 hover:bg-orange-600
            text-white font-bold py-2 px-4 rounded-full 
            focus:outline-none focus:shadow-outline absolute top-16 right-4 m-2"
          >
            Add This Course using subscription
          </button>
          {errorMessage && (
            <div className="text-red-500 mt-2 absolute top-50 right-4">
              {errorMessage}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CourseDetails;
