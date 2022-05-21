import axios from 'axios';

const API_URL = 'https://productfeedbackapp.herokuapp.com/productRequests/';

// Get feedback comments
const getComments = async (feedbackId) => {
  const res = await axios.get(API_URL + feedbackId);

  return res.data.comments;
};

// Create feedback comment
const createComment = async (feedbackId, commentData) => {
  const res = await axios.patch(API_URL + feedbackId, commentData);

  return res.data;
};

const commentService = {
  getComments,
  createComment,
};

export default commentService;
