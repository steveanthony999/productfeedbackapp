import axios from 'axios';

const API_URL = 'https://productfeedbackapp.herokuapp.com/productRequests/';

// Create New Feedback
const createFeedback = async (feedbackData) => {
  const res = await axios.post(API_URL, feedbackData);

  return res.data;
};

// Get all feedback
const getFeedback = async (filteredItem) => {
  const res = await axios.get(API_URL, filteredItem);

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
const getSingleFeedback = async (feedbackId) => {
  const res = await axios.get(API_URL + feedbackId);

  return res.data;
};

const feedbackService = { createFeedback, getFeedback, getSingleFeedback };

export default feedbackService;
