import { useState } from 'react';

import IconArrowUp from '../assets/shared/icon-arrow-up.svg';

import '../styles/components/upvotes.css';

const Upvotes = ({ feedback, upvotes, dispatchUpvotes }) => {
  const feedbackId = feedback._id;

  const [isUpvote, setIsUpvote] = useState();

  const handleUpvoteClick = (e) => {
    e.preventDefault();
    setIsUpvote((prevState) => !prevState);

    const upvoteData = {
      feedbackId,
      upvotes: upvotes + 1,
    };

    dispatchUpvotes({ upvoteData });
  };

  return (
    <div
      className='upvote-btn'
      style={{ background: isUpvote && '#4661e6' }}
      onClick={handleUpvoteClick}>
      <img
        src={IconArrowUp}
        alt='up'
        style={{ filter: isUpvote && 'brightness(1000%)' }}
      />
      <p className='h4 text-darker-blue' style={{ color: isUpvote && '#fff' }}>
        {/* {feedback.upvotes} */}
        {upvotes}
      </p>
    </div>
  );
};
export default Upvotes;
