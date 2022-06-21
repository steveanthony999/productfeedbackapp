import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

import { toggleReplyBox } from '../features/feedback/replySlice';

import '../styles/components/reply.css';

const Reply = ({
  replyingTo,
  commentId,
  isReplyingToReply,
  parentCommentId,
  dispatchReply,
  reply,
}) => {
  const { feedbackId } = useParams();
  const dispatch = useDispatch();

  const { isOpen, replyId } = useSelector((state) => state.replies);

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

    isOpen &&
      replyId === reply._id &&
      dispatch(toggleReplyBox({ isOpen, reply }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='Reply'>
      <form onSubmit={handleSubmit}>
        <textarea
          className='border body-2 text-darker-blue'
          name='reply'
          id='reply'
          value={content}
          onChange={(e) => setContent(e.target.value)}></textarea>
        <button className='text-very-light h4 border'>Post Reply</button>
      </form>
    </motion.div>
  );
};
export default Reply;
