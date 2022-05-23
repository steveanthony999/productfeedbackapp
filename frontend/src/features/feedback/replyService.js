import axios from 'axios';

const API_URL = 'https://productfeedbackapp.herokuapp.com/productRequests/';

// Get comments replies
const getReplies = async (feedbackId, commentId) => {
  const res = await axios.get(API_URL + feedbackId);

  //   For existing feedback items that have no comments array
  // if (res.data.comments === undefined) {
  //   const res = await axios.patch(API_URL + feedbackId, { comments: [] });

  //   return res.data.comments;
  // }

  //   console.log(res.data.comments.replies);
  res.data.comments.map(
    (comment) => comment.replies !== undefined && console.log(comment.replies)
  );
  //   return res.data.comments.replies;
};

const replyService = {
  getReplies,
};

export default replyService;
