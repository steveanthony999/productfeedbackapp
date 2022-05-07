import { useEffect, useState } from 'react';
import axios from 'axios';

import IconArrowUp from '../assets/shared/icon-arrow-up.svg';
import IconComments from '../assets/shared/icon-comments.svg';

const RoadmapCard = ({
  color,
  status,
  feedbackId,
  title,
  description,
  category,
  upvotes,
  commentsLength,
}) => {
  const [isUpvote, setIsUpvote] = useState();
  const [feedbackUpvotes, setFeedbackUpvotes] = useState(upvotes);

  const handleUpvoteClick = (e) => {
    e.preventDefault();
    setIsUpvote((prevState) => !prevState);
    // Dispatch upvote
  };

  useEffect(() => {
    if (isUpvote === true) {
      axios
        .patch(
          `https://productfeedbackapp.herokuapp.com/productRequests/${feedbackId}`,
          { upvotes: upvotes + 1 }
        )
        .then((res) => setFeedbackUpvotes(res.data.upvotes));
    } else if (isUpvote === false) {
      axios
        .patch(
          `https://productfeedbackapp.herokuapp.com/productRequests/${feedbackId}`,
          { upvotes: upvotes }
        )
        .then((res) => setFeedbackUpvotes(res.data.upvotes));
    }
  }, [isUpvote]);

  return (
    <div
      className='RoadmapCard border'
      style={{
        borderTop: `6px solid ${
          color === 'orange'
            ? '#f49f85'
            : color === 'purple'
            ? '#AD1FEA'
            : color === 'light-blue' && '#62BCFA'
        }`,
      }}>
      <div className='top'>
        <div
          className={`bullet bullet-${
            color === 'orange'
              ? 'orange'
              : color === 'purple'
              ? 'purple'
              : color === 'light-blue' && 'blue'
          }`}></div>
        <p className='text-grey-blue body-1'>{status}</p>
      </div>
      <div className='middle'>
        <h3 className='h3 text-darker-blue'>{title}</h3>
        <p className='body-1 text-grey-blue'>{description}</p>
        <div className='btn text-blue body-3'>{category}</div>
      </div>
      <div className='bottom'>
        <div
          className='btn'
          style={{ background: isUpvote && '#4661e6' }}
          onClick={handleUpvoteClick}>
          <img
            src={IconArrowUp}
            alt='up'
            style={{ filter: isUpvote && 'brightness(1000%)' }}
          />
          <p
            className='h4 text-darker-blue'
            style={{ color: isUpvote && '#fff' }}>
            {/* {upvotes} */}
            {feedbackUpvotes}
          </p>
        </div>

        <div className='comments'>
          <img src={IconComments} alt='bubble' />
          <p className='text-darker-blue h4'>{commentsLength}</p>
        </div>
      </div>
    </div>
  );
};
export default RoadmapCard;
