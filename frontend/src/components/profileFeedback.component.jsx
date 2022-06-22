import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

import { getFeedback } from '../features/feedback/feedbackSlice';
import {
  getUpvotes,
  addUpvote,
  downvote,
  reset as upvotesReset,
} from '../features/upvotes/upvoteSlice';
import { getComments } from '../features/feedback/commentSlice';
import { getCurrentUser } from '../features/auth/authSlice';

import ProductFeedback from './productFeedback.component';

import '../styles/components/profileFeedback.css';

const ProfileFeedback = ({ fucSelector }) => {
  const dispatch = useDispatch();

  const { feedback } = useSelector((state) => state.feedback);
  const { comments } = useSelector((state) => state.comments);
  const { upvotes, isSuccess: isUpvotesSuccess } = useSelector(
    (state) => state.upvotes
  );
  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getFeedback());
    dispatch(getComments());
    dispatch(getUpvotes());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      if (isUpvotesSuccess) {
        dispatch(upvotesReset());
      }
    };
  }, [dispatch, isUpvotesSuccess]);

  const dispatchUpvotes = async (data) => {
    const votes = upvotes.filter(
      (upvote) => upvote.feedbackId === data.upvoteData.feedbackId
    );

    const upvoteId = votes[0]._id;
    await dispatch(addUpvote({ upvoteId, ...data }));
    dispatch(getUpvotes());
    dispatch(getCurrentUser());
  };

  const dispatchDownvotes = async (data) => {
    const votes = upvotes.filter(
      (upvote) => upvote.feedbackId === data.downvoteData.feedbackId
    );

    const upvoteId = votes[0]._id;
    await dispatch(downvote({ upvoteId, ...data }));
    dispatch(getUpvotes());
    dispatch(getCurrentUser());
  };

  const [fuc, setFuc] = useState();

  useEffect(() => {
    if (fucSelector === 'upvotes') {
      const temp = [];
      for (let i = 0; i < feedback.length; i++) {
        for (let j = 0; j < upvotes.length; j++) {
          if (feedback[i].upvoteId === upvotes[j]._id) {
            if (upvotes[j].userId.includes(currentUser._id)) {
              temp.push(feedback[i]);
            }
          }
        }
      }
      setFuc(temp);
    } else if (fucSelector === 'comments') {
      const filteredComments = comments.filter(
        (comment) => comment.userId === currentUser._id
      );

      const temp = [];

      for (let i = 0; i < feedback.length; i++) {
        for (let j = 0; j < filteredComments.length; j++) {
          if (feedback[i].commentId.includes(filteredComments[j]._id)) {
            temp.push(feedback[i]);
          }
        }
      }
      setFuc(temp);
    } else if (fucSelector === 'feedback') {
      setFuc(feedback.map((fb) => fb.userId === currentUser._id && fb));
    }
  }, [feedback, upvotes, fucSelector, comments, currentUser]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='ProfileFeedback'>
      <AnimatePresence>
        {feedback.length > 0 &&
          fuc &&
          fuc
            .filter((x) => x !== false && x !== undefined)
            .map((fb, index) => (
              <ProductFeedback
                key={index}
                feedback={fb}
                feedbackId={fb._id}
                commentsFromProps={comments.filter(
                  (comment) =>
                    comment.feedbackId === fb._id &&
                    comment.commentId === null &&
                    comment.isReply === false
                )}
                replies={comments.filter(
                  (reply) =>
                    reply.feedbackId === fb._id &&
                    reply.commentId !== null &&
                    reply.isReply === true &&
                    reply.isReplyingToReply === false
                )}
                upvotes={
                  upvotes &&
                  upvotes
                    .filter((upvote) => upvote.feedbackId === fb._id)
                    .map((upvt) => upvt.upvotes)
                }
                dispatchUpvotes={dispatchUpvotes}
                dispatchDownvotes={dispatchDownvotes}
                user={currentUser}
                didCurrentUserUpvote={
                  upvotes
                    .filter((upvote) => upvote.feedbackId === fb._id)
                    .map((upvote) => upvote.userId.includes(currentUser._id))[0]
                }
              />
            ))}
      </AnimatePresence>
    </motion.div>
  );
};
export default ProfileFeedback;
