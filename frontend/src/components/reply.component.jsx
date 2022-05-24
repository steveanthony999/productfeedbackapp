import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import uuid from 'react-uuid';

import { createReply, reset } from '../features/feedback/replySlice';

import userInfo from '../user.json';

import '../styles/components/reply.css';

const Reply = ({ commentProps, replyProps, isFromReply }) => {
  const { replies, isError, isSuccess, message } = useSelector(
    (state) => state.replies
  );
  const { feedbackId } = useParams();

  const dispatch = useDispatch();

  const [content, setContent] = useState('');

  const user = userInfo.currentUser;

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess) {
      dispatch(reset);
    }

    dispatch(reset);
  }, [dispatch, isError, isSuccess, message]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { id } = isFromReply ? replyProps : commentProps; // The id of the comment/reply user is replying to
    const { username } = isFromReply ? replyProps.user : commentProps.user;
    const replyData = {
      commentId: id,
      id: uuid(),
      replyingTo: username,
      content,
      user,
    };
    // comments: [...comments, { id: uuid(), content, user }],

    dispatch(createReply({ feedbackId, replyData }));
    // console.log({ feedbackId, ...replyData });

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
