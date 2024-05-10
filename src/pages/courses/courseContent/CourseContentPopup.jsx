import React from 'react';

const CourseContentPopup = ({ content, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
        <h3 className="text-xl font-bold text-orange-500 mb-4">{content?.title}</h3>
        <div className="mb-4">
          <img src={content?.image} alt={content?.title} className="w-full h-48 object-cover rounded-md" />
        </div>
        <p className="text-black-400 mb-4">{content?.description}</p>
        <button onClick={onClose} className="text-lg text-orange-500 font-semibold hover:text-gray-900 focus:outline-none">
          Close
        </button>
      </div>
    </div>
  );
}

export default CourseContentPopup;
