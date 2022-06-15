import axios from 'axios';

const BACKEND_API_URL = '/api/feedback/';

// Get Upvotes
const getUpvotes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(BACKEND_API_URL + 'upvotes', config);

  return res.data;
};

// Add upvote
const addUpvote = async (upvoteId, upvoteData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(
    BACKEND_API_URL + 'upvotes/' + upvoteId,
    upvoteData,
    config
  );

  return res.data;
};

// Downvote
const downvote = async (upvoteId, downvoteData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.put(
    BACKEND_API_URL + 'upvotes/' + upvoteId,
    downvoteData,
    config
  );

  return res.data;
};

const upvoteService = {
  getUpvotes,
  addUpvote,
  downvote,
};

export default upvoteService;
