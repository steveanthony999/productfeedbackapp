import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getComments } from '../features/feedback/commentSlice';
import { toggleReplyBox } from '../features/feedback/replySlice';

import Replies from './replies.component';
import Reply from './reply.component';

import '../styles/components/comments.css';

const Comments = ({ commentProps, users, user, replies, dispatchReply }) => {
  const { feedbackId } = useParams();

  const dispatch = useDispatch();

  const { comments } = useSelector((state) => state.comments);
  const { isOpen, replyId } = useSelector((state) => state.replies);

  const [repliesLength, setRepliesLength] = useState(0);

  useEffect(() => {
    dispatch(getComments());
  }, [dispatch]);

  useEffect(() => {
    replies && setRepliesLength(replies.length);
  }, [commentProps, replies]);

  return (
    <div className='Comments'>
      {replies &&
        replies.length > 0 &&
        replies.find((reply) => reply.commentId === commentProps._id) && (
          <div className='line' style={{ height: '63%' }}></div>
        )}
      <div className='top'>
        <img
          src={user[0] && user[0].image}
          alt='usr'
          className='user-image'
          crossOrigin='anonymous'
        />
        <div className='user-info'>
          <h4 className='h4 text-darker-blue'>{user[0] && user[0].name}</h4>
          <p className='body3 text-grey-blue'>@{user[0] && user[0].username}</p>
        </div>
        <button
          className='text-blue body-3'
          onClick={() => dispatch(toggleReplyBox({ isOpen, ...commentProps }))}>
          Reply
        </button>
      </div>
      <div className='middle'>
        <p className='body-2 text-grey-blue'>{commentProps.content}</p>
        {isOpen && replyId === commentProps._id && (
          <div className='reply-container'>
            <Reply
              replyingTo={user[0].username}
              commentId={commentProps._id}
              dispatchReply={dispatchReply}
              isReplyingToReply={false}
              parentCommentId={commentProps.parentCommentId}
              reply={commentProps}
            />
          </div>
        )}
        {!replies && <hr />}
      </div>
      {comments &&
        comments
          .filter(
            (reply) =>
              reply.feedbackId === feedbackId &&
              reply.commentId !== null &&
              reply.isReply === true
          )
          .filter(
            (reply) => reply.parentCommentId === commentProps.parentCommentId
          )
          .map((reply) => (
            <Replies
              key={reply._id}
              reply={reply}
              repliesLength={repliesLength}
              commentProps={commentProps}
              feedbackId={feedbackId}
              user={users.filter((user) => user._id === reply.userId)}
              dispatchReply={dispatchReply}
            />
          ))}
    </div>
  );
};
export default Comments;
