import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import IconArrowUp from '../assets/shared/icon-arrow-up.svg';
import IconComments from '../assets/shared/icon-comments.svg';

const ProductFeedback = ({ feedback }) => {
  const [commentsLength, setCommentsLength] = useState([]);
  const [repliesLength, setRepliesLength] = useState([]);
  const [isHover, setIsHover] = useState(false);
  const [isUpvote, setIsUpvote] = useState(false);

  const handleUpvoteClick = (e) => {
    e.preventDefault();
    setIsUpvote((prevState) => !prevState);
    // Dispatch upvote
  };

  useEffect(() => {
    _.find(
      feedback,
      feedback.comments
        ? setCommentsLength(feedback.comments.length)
        : setCommentsLength(0)
    );
  }, [feedback]);

  useEffect(() => {
    _.find(
      feedback,
      feedback.comments &&
        _.filter(
          feedback.comments,
          (x) => x.replies && setRepliesLength(x.replies.length)
        )
    );
  }, [feedback]);

  return (
    <Link
      to={`/feedback/${feedback.id}`}
      state={{ feedback }}
      className='ProductFeedback border'
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
      <div className='container border'>
        <div className='left'>
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
              {feedback.upvotes}
            </p>
          </div>
        </div>
        <div className='middle'>
          <h3 className={`h3 ${isHover ? 'text-blue' : 'text-darker-blue'}`}>
            {feedback.title}
          </h3>
          <p className='body-1 text-grey-blue'>{feedback.description}</p>
          <div className='btn text-blue body-3'>{feedback.category}</div>
        </div>
        <div className='right'>
          <img src={IconComments} alt='bubble' />
          <p className='text-darker-blue h4'>
            {commentsLength + repliesLength} {repliesLength > 0 ? '*' : null}
          </p>
        </div>
      </div>
    </Link>
  );
};
export default ProductFeedback;
