import axios from 'axios';

const API_URL = 'https://productfeedbackapp.herokuapp.com/productRequests/';

// Get comments replies
const getReplies = async (feedbackId, commentProps) => {
  const res = await axios.get(API_URL + feedbackId);

  const replies = res.data.comments.map(
    (comment) => commentProps.id === comment.id && comment.replies
  );

  const replyArray = replies.filter((reply) => reply !== false);

  //   const x = replyArray.map((reply) => reply);

  return replyArray[0];

  //   return res.data.replies && res.data.replies;
};

const createReply = async (feedbackId, replyData) => {
  const res = await axios.patch(API_URL + feedbackId, replyData);

  const comment = res.data.comments.filter(
    (comment) => comment.id === res.data.commentId
  );

  const x = (comment[0].replies = [...comment[0].replies, replyData]);

  return x[0];
};

const replyService = {
  getReplies,
  createReply,
};

export default replyService;
