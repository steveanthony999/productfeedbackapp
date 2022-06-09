import axios from 'axios';

const API_URL = 'https://productfeedbackapp.herokuapp.com/productRequests/';
const BACKEND_API_URL = '/api/feedback/';

// Create New Feedback
const createFeedback = async (feedbackData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(BACKEND_API_URL, feedbackData, config);

  return res.data;
};

// Get all feedback
const getFeedback = async (filteredItem, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(BACKEND_API_URL, config, filteredItem);

  if (filteredItem) {
    const newProductRequests = res.data.filter(
      (item) => item.category === filteredItem
    );

    return newProductRequests;
  } else {
    return res.data;
  }
};

// Get Single Feedback
const getSingleFeedback = async (feedbackId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(BACKEND_API_URL + feedbackId, config);

  return res.data;
};

// Delete Feedback
const deleteFeedback = async (feedbackId) => {
  const res = await axios.delete(API_URL + feedbackId);

  return res.data;
};

// Update Feedback
const updateFeedback = async (feedbackId, feedbackData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.put(
    BACKEND_API_URL + feedbackId,
    feedbackData,
    config
  );

  return res.data;
};

const feedbackService = {
  createFeedback,
  getFeedback,
  getSingleFeedback,
  deleteFeedback,
  updateFeedback,
};

export default feedbackService;
