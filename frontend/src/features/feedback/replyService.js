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

const createReply = async (feedbackId, replyData) => {
  //   const res = await axios.patch(API_URL + feedbackId, {
  //     id: replyData.id,
  //     replyingTo: replyData.username,
  //     content: replyData.content,
  //     user: replyData.user,
  //   });
  const res = await axios.patch(API_URL + feedbackId, replyData);

  //   const replyObj = res.data.replyData;
  const replyObj = res.data;
  const commentData = res.data.comments;

  console.log(replyObj);

  commentData.map(
    (comment) =>
      comment.id === replyObj.commentId &&
      //   comment.replies.push({ ...replyObj.replyData })
      console.log(comment.replies.length)
  );

  //   console.log(res.data.replyData);
  //   return replyObj;

  //   return repl;
};

const replyService = {
  getReplies,
  createReply,
};

export default replyService;
