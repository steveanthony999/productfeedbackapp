import { useState } from 'react';

import Reply from './reply.component';

import '../styles/components/replies.css';

const Replies = ({ reply, repliesLength }) => {
  const [isReply, setIsReply] = useState(false);

  return (
    <div className='Replies'>
      {repliesLength > 1 ? (
        <div className='Replies-line-multi'></div>
      ) : (
        <div className='Replies-line-single'></div>
      )}
      <div className='top'>
        <img
          src={reply.user.image}
          alt='usr'
          className='user-image'
          crossOrigin='anonymous'
        />
        <div className='user-info'>
          <h4 className='h4 text-darker-blue'>{reply.user.name}</h4>
          <p className='body3 text-grey-blue'>@{reply.user.username}</p>
        </div>
        <button
          className='text-blue body-3'
          onClick={() => setIsReply((prevState) => !prevState)}>
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
        {isReply && (
          <div className='reply-container'>
            <Reply replyProps={reply} isFromReply={isReply} />
          </div>
        )}
      </div>
    </div>
  );
};
export default Replies;
