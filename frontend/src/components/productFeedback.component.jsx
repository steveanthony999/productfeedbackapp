import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

import { getComments } from '../features/feedback/commentSlice';

import Upvotes from './upvotes.component';
import IconComments from '../assets/shared/icon-comments.svg';

import '../styles/components/productFeedback.css';

const ProductFeedback = ({
  feedback,
  commentsFromProps,
  replies,
  upvotes,
  dispatchUpvotes,
  dispatchDownvotes,
  // user,
  didCurrentUserUpvote,
}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 738px)' });

  const dispatch = useDispatch();

  // const { currentUser } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comments);

  const [isHover, setIsHover] = useState(false);

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  useEffect(() => {
    dispatch(getComments());
  }, [dispatch]);

  // =========================================================================================
  // MOBILE
  // =========================================================================================
  if (isMobile) {
    return (
      <Link
        to={`/feedback/${feedback._id}`}
        state={{ feedback, commentsFromProps, replies }}
        className='ProductFeedback-mobile border'
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}>
        <motion.div
          variants={item}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className='ProductFeedback-container-mobile border'>
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
                <Upvotes
                  feedback={feedback}
                  upvotes={
                    upvotes.length > 1
                      ? upvotes[1]
                      : upvotes[0] > 0
                      ? upvotes[0]
                      : 0
                  }
                  dispatchUpvotes={dispatchUpvotes}
                  dispatchDownvotes={dispatchDownvotes}
                  // user={user}
                  // user={currentUser}
                  didCurrentUserUpvote={didCurrentUserUpvote}
                />
              </div>
              <div className='ProductFeedback-right-mobile'>
                <img src={IconComments} alt='bubble' />
                <p className='text-darker-blue h4'>
                  {comments &&
                    comments.filter(
                      (comment) => comment.feedbackId === feedback._id
                    ).length}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  // =========================================================================================
  // DESKTOP
  // =========================================================================================
  return (
    <Link
      to={`/feedback/${feedback._id}`}
      state={{ feedback, commentsFromProps, replies }}
      className='ProductFeedback border'
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
      <motion.div
        variants={item}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className='ProductFeedback-container border'>
        <div className='ProductFeedback-left'>
          <Upvotes
            feedback={feedback}
            upvotes={
              upvotes.length > 1 ? upvotes[1] : upvotes[0] > 0 ? upvotes[0] : 0
            }
            dispatchUpvotes={dispatchUpvotes}
            dispatchDownvotes={dispatchDownvotes}
            // user={user}
            // user={currentUser}
            didCurrentUserUpvote={didCurrentUserUpvote}
          />
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
            {comments &&
              comments.filter((comment) => comment.feedbackId === feedback._id)
                .length}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};
export default ProductFeedback;
