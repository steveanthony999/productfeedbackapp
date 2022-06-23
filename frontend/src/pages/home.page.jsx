import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { motion } from 'framer-motion';

import { getCurrentUser } from '../features/auth/authSlice';
import { getFeedback, reset } from '../features/feedback/feedbackSlice';
import {
  getComments,
  reset as commentReset,
} from '../features/feedback/commentSlice';
import {
  getUpvotes,
  addUpvote,
  downvote,
  reset as upvotesReset,
} from '../features/upvotes/upvoteSlice';

import Marquee from '../components/marquee.component';
import CategoryBox from '../components/categoryBox.component';
import RoadmapBox from '../components/roadmapBox.component';
import TopBarHome from '../components/topBarHome.component';
import ProductFeedback from '../components/productFeedback.component';
import EmptyFeedback from '../components/emptyFeedback.component';
import UserBox from '../components/userBox.component';

import '../styles/pages/home.css';
import Sidebar from '../components/sidebar';
import LoadingHome from '../components/loadingHome.component';

const Home = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 738px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 1110px)' });

  const { currentUser } = useSelector((state) => state.auth);
  const { feedback, isSuccess, isLoading } = useSelector(
    (state) => state.feedback
  );
  const { comments, isSuccess: isCommentSuccess } = useSelector(
    (state) => state.comments
  );
  const { upvotes, isSuccess: isUpvotesSuccess } = useSelector(
    (state) => state.upvotes
  );

  const dispatch = useDispatch();

  const [sortOrder, setSortOrder] = useState();
  const [sortedFeedback, setSortedFeedback] = useState(feedback);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(true);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getFeedback());
    dispatch(getComments());
    dispatch(getUpvotes());
  }, [dispatch]);

  useEffect(() => {
    if (isLoading) {
      setIsFeedbackLoading(true);
    } else {
      setIsFeedbackLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    return () => {
      if (isCommentSuccess) {
        dispatch(commentReset());
      }
    };
  }, [dispatch, isCommentSuccess]);

  useEffect(() => {
    return () => {
      if (isUpvotesSuccess) {
        dispatch(upvotesReset());
      }
    };
  }, [dispatch, isUpvotesSuccess]);

  useEffect(() => {
    if (feedback) {
      if (sortOrder === 'newest') {
        const sorted = feedback
          .slice()
          .sort((a, b) => b.createdAt < a.createdAt && -1);
        setSortedFeedback(sorted);
      } else if (sortOrder === 'most-upvotes') {
        const sorted = feedback
          .slice()
          .sort((a, b) => b.upvoteCount - a.upvoteCount);
        setSortedFeedback(sorted);
      } else if (sortOrder === 'least-upvotes') {
        const sorted = feedback
          .slice()
          .sort((a, b) => a.upvoteCount - b.upvoteCount);
        setSortedFeedback(sorted);
      } else if (sortOrder === 'most-comments') {
        const sorted = feedback
          .slice()
          .sort((a, b) => b.commentId.length - a.commentId.length);
        setSortedFeedback(sorted);
      } else if (sortOrder === 'least-comments') {
        const sorted = feedback
          .slice()
          .sort((a, b) => a.commentId.length - b.commentId.length);
        setSortedFeedback(sorted);
      }
    }
  }, [feedback, sortOrder]);

  const passSortOrder = (e) => {
    setSortOrder(e);
  };

  const passIsMenuOpen = (e) => {
    setIsMenuOpen(e);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => (document.body.style.overflow = 'unset');
  }, [isMenuOpen]);

  const dispatchUpvotes = async (data) => {
    const votes = upvotes.filter(
      (upvote) => upvote.feedbackId === data.upvoteData.feedbackId
    );

    const upvoteId = votes[0]._id;
    await dispatch(addUpvote({ upvoteId, ...data }));
    dispatch(getUpvotes());
    dispatch(getCurrentUser());
  };

  const dispatchDownvotes = async (data) => {
    const votes = upvotes.filter(
      (upvote) => upvote.feedbackId === data.downvoteData.feedbackId
    );

    const upvoteId = votes[0]._id;
    await dispatch(downvote({ upvoteId, ...data }));
    dispatch(getUpvotes());
    dispatch(getCurrentUser());
  };

  return (
    <motion.div
      className='Home'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <div className='Home-container'>
        <div className='Home-left'>
          <Marquee passIsMenuOpen={passIsMenuOpen} />
          {!isMobile && <CategoryBox />}
          {!isMobile && <RoadmapBox feedback={feedback} />}
          {!isMobile && !isTablet && (
            <UserBox
              feedbackLength={
                currentUser &&
                currentUser.feedbackId &&
                currentUser.feedbackId.length
              }
              upvotesLength={
                currentUser &&
                currentUser.upvoteId &&
                currentUser.upvoteId.length
              }
              commentsLength={
                currentUser &&
                currentUser.commentId &&
                currentUser.commentId.length
              }
            />
          )}
        </div>
        <div className='Home-right'>
          <Sidebar isMenuOpen={isMenuOpen} feedback={feedback} />
          <TopBarHome passSortOrder={passSortOrder} />
          {isFeedbackLoading ? (
            <LoadingHome />
          ) : feedback.length === 0 ? (
            <EmptyFeedback />
          ) : (
            <motion.div variants={container} initial='hidden' animate='show'>
              {sortedFeedback.length > 0 &&
                sortedFeedback.map((fb) => (
                  <ProductFeedback
                    key={fb._id}
                    feedback={fb}
                    feedbackId={fb._id}
                    commentsFromProps={comments.filter(
                      (comment) =>
                        comment.feedbackId === fb._id &&
                        comment.commentId === null &&
                        comment.isReply === false
                    )}
                    replies={comments.filter(
                      (reply) =>
                        reply.feedbackId === fb._id &&
                        reply.commentId !== null &&
                        reply.isReply === true &&
                        reply.isReplyingToReply === false
                    )}
                    upvotes={
                      upvotes &&
                      upvotes
                        .filter((upvote) => upvote.feedbackId === fb._id)
                        .map((upvt) => upvt.upvotes)
                    }
                    dispatchUpvotes={dispatchUpvotes}
                    dispatchDownvotes={dispatchDownvotes}
                    // user={user}
                    user={currentUser}
                    didCurrentUserUpvote={
                      upvotes
                        .filter((upvote) => upvote.feedbackId === fb._id)
                        .map((upvote) =>
                          upvote.userId.includes(currentUser._id)
                        )[0]
                    }
                  />
                ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
export default Home;
