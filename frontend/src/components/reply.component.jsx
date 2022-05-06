import { useState } from 'react';

const Reply = () => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    setText('');
  };

  return (
    <div className='Reply'>
      <form onSubmit={handleSubmit}>
        <textarea
          className='border body-2 text-darker-blue'
          name='reply'
          id='reply'
          value={text}
          onChange={(e) => setText(e.target.value)}></textarea>
        <button className='text-very-light h4 border'>Post Reply</button>
      </form>
    </div>
  );
};
export default Reply;
