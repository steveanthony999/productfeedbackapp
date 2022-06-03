import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Replies from './replies.component';
import Reply from './reply.component';

import '../styles/components/comments.css';

const Comments = ({ commentProps, users, user, replies }) => {
  const { feedbackId } = useParams();

  const [isReply, setIsReply] = useState(false);
  const [repliesLength, setRepliesLength] = useState(0);

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
          onClick={() => setIsReply((prevState) => !prevState)}>
          Reply
        </button>
      </div>
      <div className='middle'>
        <p className='body-2 text-grey-blue'>{commentProps.content}</p>
        {isReply && (
          <div className='reply-container'>
            <Reply commentProps={commentProps} />
          </div>
        )}
        {!replies && <hr />}
      </div>
      {replies &&
        replies.map(
          (reply) =>
            reply.commentId === commentProps._id && (
              <Replies
                key={reply._id}
                reply={reply}
                repliesLength={repliesLength}
                commentProps={commentProps}
                feedbackId={feedbackId}
                user={users.filter((user) => user._id === reply.userId)}
              />
            )
        )}
    </div>
  );
};
export default Comments;
