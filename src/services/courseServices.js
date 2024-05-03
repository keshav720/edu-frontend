import { axiosInstance } from "../utils/axios";


export const getAllCourses = async () => {
  try {
    const response = await axiosInstance.get('/courses/');
    return response.data;
  } catch (error) {
    console.log("Error in get all courses---",error);

    throw error.response.data;
  }
};

export const createCourse = async (courseData) => {
  try {
    console.log(courseData);
    const response = await axiosInstance.post('/courses/', courseData);
    return response.data;
  } catch (error) {
    console.log("Error in create course---",error);

    throw error.response.data;
  }
};

// Function to get a course by its ID
export const getCourseById = async (courseId) => {
  try {
    const response = await axiosInstance.get(`/courses/${courseId}`);
    console.log("response---",response);
    return response.data;
  } catch (error) {
    console.log("Error in get course by id---",error);
    throw error.response.data;
  }
};

// Function to update a course by its ID
export const updateCourseById = async (courseId, courseData) => {
  try {
    console.log("in service update course---",courseId,courseData);
    const response = await axiosInstance.put(`/courses/${courseId}`, courseData);
    console.log("response---",response);
    return response.data;
  } catch (error) {
    console.log("Error in update course by id---",error);
    throw error.response.data;
  }
};

// Function to delete a course by its ID
export const deleteCourseById = async (courseId) => {
  try {
    const response = await axiosInstance.delete(`/courses/${courseId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default axiosInstance;
