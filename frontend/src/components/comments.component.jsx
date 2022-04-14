import { useEffect } from 'react';

const Comments = ({ commentProps }) => {
  useEffect(() => {
    console.log(`${__dirname}${commentProps.user.image}`);
  }, [commentProps]);

  return (
    <div className='Comments'>
      <div className='top'>
        <img src={commentProps.user.image} alt='usr' />
      </div>
      <p>{commentProps.content}</p>
      <hr />
      {commentProps.replies &&
        commentProps.replies.map((reply, index) => (
          <p key={index}>{reply.content}</p>
        ))}
    </div>
  );
};
export default Comments;
