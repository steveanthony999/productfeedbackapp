import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { useMediaQuery } from 'react-responsive';

import IconArrowUp from '../assets/shared/icon-arrow-up.svg';
import IconComments from '../assets/shared/icon-comments.svg';
import axios from 'axios';

import '../styles/components/productFeedback.css';

const ProductFeedback = ({ feedback }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 738px)' });

  const [commentsLength, setCommentsLength] = useState([]);
  const [repliesLength, setRepliesLength] = useState([]);
  const [isHover, setIsHover] = useState(false);
  const [isUpvote, setIsUpvote] = useState();
  const [feedbackUpvotes, setFeedbackUpvotes] = useState(feedback.upvotes);

  const handleUpvoteClick = (e) => {
    e.preventDefault();
    setIsUpvote((prevState) => !prevState);
    // Dispatch upvote
  };

  useEffect(() => {
    if (isUpvote === true) {
      axios
        .patch(
          `https://productfeedbackapp.herokuapp.com/productRequests/${feedback.id}`,
          { upvotes: feedback.upvotes + 1 }
        )
        .then((res) => setFeedbackUpvotes(res.data.upvotes));
    } else if (isUpvote === false) {
      axios
        .patch(
          `https://productfeedbackapp.herokuapp.com/productRequests/${feedback.id}`,
          { upvotes: feedback.upvotes }
        )
        .then((res) => setFeedbackUpvotes(res.data.upvotes));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpvote]);

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

  if (isMobile) {
    return (
      <Link
        to={`/feedback/${feedback.id}`}
        state={{ feedback }}
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
                    {feedbackUpvotes}
                  </p>
                </div>
              </div>
              <div className='ProductFeedback-right-mobile'>
                <img src={IconComments} alt='bubble' />
                <p className='text-darker-blue h4'>
                  {commentsLength + repliesLength}
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
      to={`/feedback/${feedback.id}`}
      state={{ feedback }}
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
              {feedbackUpvotes}
            </p>
          </div>
        </div>
        <div className='ProductFeedback-middle'>
          <h3 className={`h3 ${isHover ? 'text-blue' : 'text-darker-blue'}`}>
            {feedback.title}
          </h3>
          <p className='body-1 text-grey-blue'>{feedback.description}</p>
          <div className='btn text-blue body-3'>{feedback.category}</div>
        </div>
        <div className='ProductFeedback-right'>
          <img src={IconComments} alt='bubble' />
          <p className='text-darker-blue h4'>
            {commentsLength + repliesLength}
          </p>
        </div>
      </div>
    </Link>
  );
};
export default ProductFeedback;
