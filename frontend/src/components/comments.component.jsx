import { useEffect } from 'react';

const Comments = ({ commentProps }) => {
  useEffect(() => {
    console.log(commentProps.replies);
  }, [commentProps]);

  return (
    <div className='Comments'>
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
