import axios from 'axios';

const API_URL = 'https://productfeedbackapp.herokuapp.com/productRequests/';

// Get comments replies
const getReplies = async (feedbackId, commentProps) => {
  const res = await axios.get(API_URL + feedbackId);

  return res.data.replies && res.data.replies;
};

const createReply = async (feedbackId, replyData) => {
  const res = await axios.patch(API_URL + feedbackId, replyData);

  console.log(res.data);
};

const replyService = {
  getReplies,
  createReply,
};

export default replyService;
