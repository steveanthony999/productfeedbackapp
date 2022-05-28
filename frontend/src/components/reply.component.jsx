import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import uuid from 'react-uuid';

import userInfo from '../user.json';

import '../styles/components/reply.css';
import { createReply } from '../features/feedback/replySlice';

const Reply = ({ commentProps, replyProps, isFromReply }) => {
  const { feedbackId } = useParams();

  const dispatch = useDispatch();

  const [content, setContent] = useState('');

  const user = userInfo.currentUser;

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
      replies: [],
    };

    // console.log({ feedbackId, ...replyData });
    // dispatch(createReply({ feedbackId, replyData }));
    alert(
      "yeah, I'm kinda stuck here! Which is why I need a job, so I can have a senior show me the ropes!"
    );

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
