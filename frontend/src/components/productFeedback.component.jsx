import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import IconArrowUp from '../assets/shared/icon-arrow-up.svg';
import IconComments from '../assets/shared/icon-comments.svg';

import '../styles/components/productFeedback.css';

const ProductFeedback = ({ feedback, comments, replies }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 738px)' });

  const [isHover, setIsHover] = useState(false);
  const [isUpvote, setIsUpvote] = useState();

  const handleUpvoteClick = (e) => {
    e.preventDefault();
    setIsUpvote((prevState) => !prevState);
    // Dispatch upvote
  };

  if (isMobile) {
    return (
      <Link
        to={`/feedback/${feedback._id}`}
        state={{ feedback, comments, replies }}
        className='ProductFeedback-mobile border'
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}>
        <div className='ProductFeedback-container-mobile border'>
          <div className='ProductFeedback-middle-mobile'>
            <h3 className={`h3 ${isHover ? 'text-blue' : 'text-darker-blue'}`}>
              {feedback.title}
            </h3>
            <p className='ProductFeedback-description body-1 text-grey-blue'>
              {feedback.description}
            </p>
            <div className='btn text-blue body-3'>{feedback.category}</div>
            <div className='ProductFeedback-bottom-mobile'>
              <div className='ProductFeedback-bottom-container-mobile'>
                <div
                  className='upvote-btn'
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
              <div className='ProductFeedback-right-mobile'>
                <img src={IconComments} alt='bubble' />
                <p className='text-darker-blue h4'>
                  {comments && comments.length + replies.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/feedback/${feedback._id}`}
      state={{ feedback, comments, replies }}
      className='ProductFeedback border'
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
      <div className='ProductFeedback-container border'>
        <div className='ProductFeedback-left'>
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
        <div className='ProductFeedback-middle'>
          <h3 className={`h3 ${isHover ? 'text-blue' : 'text-darker-blue'}`}>
            {feedback.title}
          </h3>
          <p className='body-1 text-grey-blue'>{feedback.description}</p>
          <div className='btn text-blue body-3'>
            {feedback.category === 'ux'
              ? feedback.category.toUpperCase()
              : feedback.category === 'ui'
              ? feedback.category.toUpperCase()
              : feedback.category}
          </div>
        </div>
        <div className='ProductFeedback-right'>
          <img src={IconComments} alt='bubble' />
          <p className='text-darker-blue h4'>
            {comments && comments.length + replies.length}
          </p>
        </div>
      </div>
    </Link>
  );
};
export default ProductFeedback;
