import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Replies from './replies.component';
import Reply from './reply.component';

import '../styles/components/comments.css';

const Comments = ({ commentProps }) => {
  const { feedbackId } = useParams();

  const [isReply, setIsReply] = useState(false);
  const [repliesLength, setRepliesLength] = useState(0);

  useEffect(() => {
    commentProps.replies && setRepliesLength(commentProps.replies.length);
  }, [commentProps]);

  return (
    <div className='Comments'>
      {commentProps.replies && commentProps.replies.length > 0 && (
        <div className='line' style={{ height: '63%' }}></div>
      )}
      <div className='top'>
        <img
          src={commentProps.user.image}
          alt='usr'
          className='user-image'
          crossOrigin='anonymous'
        />
        <div className='user-info'>
          <h4 className='h4 text-darker-blue'>{commentProps.user.name}</h4>
          <p className='body3 text-grey-blue'>@{commentProps.user.username}</p>
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
        {!commentProps.replies && <hr />}
      </div>
      {commentProps.replies &&
        commentProps.replies.map((reply) => (
          <Replies
            key={reply.id}
            reply={reply}
            repliesLength={repliesLength}
            commentProps={commentProps}
            feedbackId={feedbackId}
          />
        ))}
    </div>
  );
};
export default Comments;
