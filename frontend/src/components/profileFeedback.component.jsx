import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getFeedback, reset } from '../features/feedback/feedbackSlice';
import {
  getUpvotes,
  addUpvote,
  downvote,
  reset as upvotesReset,
} from '../features/upvotes/upvoteSlice';
import {
  getComments,
  reset as commentReset,
} from '../features/feedback/commentSlice';
import { getCurrentUser } from '../features/auth/authSlice';

import ProductFeedback from './productFeedback.component';

const ProfileFeedback = ({ fucSelector }) => {
  const dispatch = useDispatch();

  const { feedback } = useSelector((state) => state.feedback);
  const { comments } = useSelector((state) => state.comments);
  const { upvotes, isSuccess: isUpvotesSuccess } = useSelector(
    (state) => state.upvotes
  );
  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    // dispatch(getCurrentUser());
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

  return (
    <div>
      {feedback.length > 0 &&
        feedback
          .filter((fb) =>
            fucSelector === 'feedback'
              ? fb.userId === currentUser._id
              : fucSelector === 'comments' &&
                fb.commentId.map((id) =>
                  comments.map((comment) => comment._id === id)
                )[0]
          )
          .map((fb) => (
            <ProductFeedback
              key={fb._id}
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
    </div>
  );
};
export default ProfileFeedback;
