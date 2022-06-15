import { useEffect, useState } from 'react';

import IconArrowUp from '../assets/shared/icon-arrow-up.svg';

import '../styles/components/upvotes.css';

const Upvotes = ({
  feedback,
  upvotes,
  didCurrentUserUpvote,
  dispatchUpvotes,
  dispatchDownvotes,
}) => {
  const feedbackId = feedback._id;

  const [isUpvote, setIsUpvote] = useState(false);

  useEffect(() => {
    didCurrentUserUpvote === true ? setIsUpvote(true) : setIsUpvote(false);
  }, [didCurrentUserUpvote]);

  const handleUpvoteClick = (e) => {
    e.preventDefault();

    const upvoteData = {
      feedbackId,
      upvotes: upvotes + 1,
    };

    const downvoteData = {
      feedbackId,
      upvotes: upvotes - 1,
    };

    if (isUpvote === true) {
      dispatchDownvotes({ downvoteData });
      setIsUpvote(false);
    } else if (isUpvote === false) {
      dispatchUpvotes({ upvoteData });
      setIsUpvote(true);
    }
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
        {upvotes}
      </p>
    </div>
  );
};
export default Upvotes;
