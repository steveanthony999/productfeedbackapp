import { useState } from 'react';

import userInfo from '../user.json';

import '../styles/components/reply.css';

const Reply = ({ commentProps, replyProps, isFromReply }) => {
  const [content, setContent] = useState('');

  const user = userInfo.currentUser;

  const handleSubmit = (e) => {
    e.preventDefault();

    const { id } = isFromReply ? replyProps : commentProps;
    const { username } = isFromReply ? replyProps.user : commentProps.user;

    console.log({ id, username, content, user });

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
