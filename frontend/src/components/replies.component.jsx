import { useSelector, useDispatch } from 'react-redux';

import { toggleReplyBox } from '../features/feedback/replySlice';

import Reply from './reply.component';

import '../styles/components/replies.css';

const Replies = ({
  commentProps,
  reply,
  repliesLength,
  user,
  dispatchReply,
}) => {
  const dispatch = useDispatch();

  const { isOpen, replyId } = useSelector((state) => state.replies);

  return (
    <div className='Replies'>
      {repliesLength > 1 ? (
        <div className='Replies-line-multi'></div>
      ) : (
        <div className='Replies-line-single'></div>
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
          onClick={() => dispatch(toggleReplyBox({ isOpen, ...reply }))}>
          Reply
        </button>
      </div>
      <div className='middle'>
        <p className='body-2 text-grey-blue'>
          <span className='h4 text-purple'>@{reply.replyingTo}</span>
          &nbsp;&nbsp;
          {reply.content}
        </p>
      </div>
      <div className='bottom'>
        {isOpen && replyId === reply._id && (
          <div className='reply-container'>
            <Reply
              replyingTo={user[0].username}
              commentId={reply._id}
              dispatchReply={dispatchReply}
              isReplyingToReply={true}
              parentCommentId={commentProps.parentCommentId}
              reply={reply}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default Replies;
