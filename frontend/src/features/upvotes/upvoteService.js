import axios from 'axios';

const BACKEND_API_URL = '/api/feedback/';

// Get Upvotes
const getUpvotes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(BACKEND_API_URL + '/upvotes', config);

  return res.data;
};

// Create Upvote
const createUpvote = async (upvoteData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(
    BACKEND_API_URL + '/upvotes',
    upvoteData,
    config
  );

  return res.data;
};

// Add upvote
const addUpvote = async (upvoteId, upvoteData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.put(
    BACKEND_API_URL + '/upvotes/' + upvoteId,
    upvoteData,
    config
  );

  return res.data;
};

const upvoteService = {
  getUpvotes,
  createUpvote,
  addUpvote,
};

export default upvoteService;
