import { axiosInstance } from "../utils/axios";


export const getCourseContentByCourseId = async (courseId) => {
  try {
    console.log("courseid-------------",courseId);
    const response = await axiosInstance.get(`/courseContent/${courseId}`);
    return response.data;
  } catch (error) {
    console.log("Error in get all courses---",error);
    throw error.response.data;
  }
};

export const createCourseContent = async (courseData) => {
  try {
    const response = await axiosInstance.post(`/courseContent/`, courseData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error in create course content---",error);

    throw error.response.data;
  }
};

// Function to get a course by its ID
export const getCourseContentById = async (contentId) => {
  try {
    const response = await axiosInstance.get(`/courseContent/${contentId}`);
    return response.data;
  } catch (error) {
    console.log("Error in get course by id---",error);
    throw error.response.data;
  }
};

// Function to update a course by its ID
export const updateCourseContentById = async (contentId, contentData) => {
  try {
    const response = await axiosInstance.put(`/courseContent/${contentId}`, contentData);
    console.log("response---",response);
    return response.data;
  } catch (error) {
    console.log("Error in update course by id---",error);
    throw error.response.data;
  }
};

// Function to delete a course by its ID
export const deleteCourseContentById = async (contentId) => {
  try {
    const response = await axiosInstance.delete(`/courseContent/${contentId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default axiosInstance;
