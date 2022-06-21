// Libraries
import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { motion } from 'framer-motion';

// State
import { getUsers } from '../features/users/userSlice';
import { createComment, getComments } from '../features/feedback/commentSlice';
import {
  getUpvotes,
  addUpvote,
  downvote,
  reset as upvotesReset,
} from '../features/upvotes/upvoteSlice';

// Components
import Comments from '../components/comments.component';
import ProductFeedback from '../components/productFeedback.component';
import GoBack from '../components/goBack.component';

// CSS
import '../styles/pages/feedbackPage.css';

const FeedbackDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { feedback, replies, fromRoadmap } = location.state;
  const { feedbackId } = useParams();

  const { users } = useSelector((state) => state.users);
  const { comments } = useSelector((state) => state.comments);
  const { upvotes, isSuccess: isUpvotesSuccess } = useSelector(
    (state) => state.upvotes
  );

  const user = JSON.parse(localStorage.getItem('user'));

  const [content, setContent] = useState('');
  const [textLength, setTextLength] = useState(0);

  useEffect(() => {
    return () => {
      if (isUpvotesSuccess) {
        dispatch(upvotesReset());
      }
    };
  }, [dispatch, isUpvotesSuccess]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const commentData = {
        userId: user._id,
        feedbackId,
        content,
        parentCommentId: nanoid(),
      };

      dispatch(createComment({ commentData }));

      setContent('');
    },
    [content, dispatch, feedbackId, user._id]
  );

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    setTextLength(content.length);
  }, [content, textLength]);

  const dispatchReply = useCallback(
    (commentData) => {
      dispatch(createComment({ commentData }));
    },
    [dispatch]
  );

  const dispatchUpvotes = async (data) => {
    const votes = upvotes.filter(
      (upvote) => upvote.feedbackId === data.upvoteData.feedbackId
    );

    const upvoteId = votes[0]._id;
    await dispatch(addUpvote({ upvoteId, ...data }));
    dispatch(getUpvotes());
  };

  const dispatchDownvotes = async (data) => {
    const votes = upvotes.filter(
      (upvote) => upvote.feedbackId === data.downvoteData.feedbackId
    );

    const upvoteId = votes[0]._id;
    await dispatch(downvote({ upvoteId, ...data }));
    dispatch(getUpvotes());
  };

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getComments());
    dispatch(getUpvotes());
  }, [dispatch]);

  return (
    <motion.div
      className='FeedbackDetailPage'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <div className='container'>
        <div className='top-bar'>
          <GoBack
            to={fromRoadmap ? '/roadmap' : '/'}
            styles='text-grey-blue h4'
          />
          <Link
            to={`/edit-feedback${location.pathname}`}
            state={{ feedback, replies }}
            className='button border h4 text-very-light'>
            Edit Feedback
          </Link>
        </div>
        <ProductFeedback
          feedback={feedback}
          commentsFromProps={comments
            .filter(
              (comment) =>
                comment.feedbackId === feedbackId && comment.commentId === null
            )
            .filter(
              (comment) =>
                (comment.feedbackId === feedback._id &&
                  comment.commentId === undefined) ||
                (comment.commentId === null && comment.isReply === false)
            )}
          replies={comments
            .filter(
              (comment) =>
                comment.feedbackId === feedbackId &&
                comment.commentId !== null &&
                comment.isReply === true
            )
            .filter(
              (reply) =>
                reply.feedbackId === feedback._id &&
                reply.commentId !== null &&
                reply.isReply === true
            )}
          upvotes={upvotes
            .filter((upvote) => upvote.feedbackId === feedback._id)
            .map((upvt) => upvt.upvotes)}
          dispatchUpvotes={dispatchUpvotes}
          dispatchDownvotes={dispatchDownvotes}
          user={user}
          didCurrentUserUpvote={
            upvotes &&
            upvotes
              .filter((upvote) => upvote.feedbackId === feedback._id)
              .map((upvote) => upvote.userId.includes(user._id))[0]
          }
        />
        <div className='comments-container border'>
          <div className='top'>
            <h3 className='h3 text-darker-blue'>
              {comments
                ? comments.filter(
                    (comment) =>
                      comment.feedbackId === feedbackId &&
                      comment.commentId === null
                  ).length +
                  comments.filter(
                    (comment) =>
                      comment.feedbackId === feedbackId &&
                      comment.commentId !== null &&
                      comment.isReply === true
                  ).length
                : 0}{' '}
              {comments &&
              comments.filter(
                (comment) =>
                  comment.feedbackId === feedbackId &&
                  comment.commentId === null
              ).length === 1
                ? 'Comment'
                : 'Comments'}
            </h3>
          </div>
          <div className='middle'>
            {comments &&
              comments
                .filter(
                  (comment) =>
                    comment.feedbackId === feedbackId &&
                    comment.commentId === null
                )
                .map(
                  (comment, index) =>
                    comment !== null && (
                      <Comments
                        key={comment._id}
                        commentProps={comment}
                        hrIndex={index}
                        users={users}
                        user={users.filter(
                          (user) => user._id === comment.userId
                        )}
                        replies={comments.filter(
                          (reply) =>
                            reply.feedbackId === feedbackId &&
                            reply.commentId !== null &&
                            reply.isReply === true &&
                            reply.isReplyingToReply === false
                        )}
                        dispatchReply={dispatchReply}
                      />
                    )
                )}
          </div>
        </div>
        <div className='add-comment border'>
          <h3 className='h3 text-darker-blue'>Add Comment</h3>
          <form onSubmit={handleSubmit}>
            <textarea
              className='border body-2 text-darker-blue'
              name='comment'
              id='comment'
              value={content}
              placeholder='Type your comment here'
              onChange={handleChange}></textarea>
            <div className='bottom'>
              <p
                className='body-2'
                style={{ color: textLength > 255 ? 'red' : '#647196' }}>
                {255 - textLength} Characters left
              </p>
              <button className='button border h4 text-very-light'>
                Post Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};
export default FeedbackDetail;

//
