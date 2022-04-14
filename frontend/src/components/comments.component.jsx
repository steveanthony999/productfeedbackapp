import { useState } from 'react';

const Comments = ({ commentProps }) => {
  const [isReply, setIsReply] = useState(false);

  return (
    <div className='Comments'>
      <div className='top'>
        <img src={commentProps.user.image} alt='usr' crossOrigin='anonymous' />
        <div className='user-info'>
          <h4 className='h4 text-darker-blue'>{commentProps.user.name}</h4>
          <p className='body3 text-grey-blue'>@{commentProps.user.username}</p>
        </div>
        <button onClick={() => setIsReply((prevState) => !prevState)}>
          Reply
        </button>
      </div>
      <p>{commentProps.content}</p>
      <hr />
      {commentProps.replies &&
        commentProps.replies.map((reply, index) => (
          <p key={index}>{reply.content}</p>
        ))}
      {isReply && <div className='reply-container'>Hello reply</div>}
    </div>
  );
};
export default Comments;
