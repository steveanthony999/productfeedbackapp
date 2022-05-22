import axios from 'axios';

const API_URL = 'https://productfeedbackapp.herokuapp.com/productRequests/';

// Get feedback comments
const getComments = async (feedbackId) => {
  const res = await axios.get(API_URL + feedbackId);

  //   For existing feedback items that have no comments array
  if (res.data.comments === undefined) {
    const res = await axios.patch(API_URL + feedbackId, { comments: [] });

    return res.data.comments;
  }

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
