import axios from 'axios';

const API_URL = 'https://productfeedbackapp.herokuapp.com/productRequests/';
const BACKEND_API_URL = '/api/feedback/';

// Get feedback comments
const getComments = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(BACKEND_API_URL + '/comments', config);

  //   const response = res.data.map((comments) => {
  //     if (comments.feedbackId === feedbackId) {
  //       return comments;
  //     }
  //     return null;
  //   });

  //   return response;

  return res.data;
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
