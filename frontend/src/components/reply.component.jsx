import { useState } from 'react';
import { useParams } from 'react-router-dom';

import '../styles/components/reply.css';

const Reply = ({
  replyingTo,
  commentId,
  isReplyingToReply,
  parentCommentId,
  dispatchReply,
}) => {
  const { feedbackId } = useParams();

  const user = JSON.parse(localStorage.getItem('user'));

  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const replyData = {
      userId: user._id,
      feedbackId,
      commentId,
      content,
      replyingTo,
      isReply: true,
      isReplyingToReply,
      parentCommentId,
    };

    dispatchReply(replyData);

    setContent('');
  };

  return (
    <div className='Reply'>
      <form onSubmit={handleSubmit}>
        <textarea
          className='border body-2 text-darker-blue'
          name='reply'
          id='reply'
          value={content}
          onChange={(e) => setContent(e.target.value)}></textarea>
        <button className='text-very-light h4 border'>Post Reply</button>
      </form>
    </div>
  );
};
export default Reply;
