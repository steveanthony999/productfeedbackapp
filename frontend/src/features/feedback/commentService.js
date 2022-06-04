import axios from 'axios';

const BACKEND_API_URL = '/api/feedback/';

// Get feedback comments
const getComments = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(BACKEND_API_URL + '/comments', config);

  return res.data;
};

// Create feedback comment
const createComment = async (commentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(
    BACKEND_API_URL + '/comments',
    commentData,
    config
  );

  return res.data;
};

const commentService = {
  getComments,
  createComment,
};

export default commentService;
