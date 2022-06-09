import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import _ from 'lodash';

import { getFeedback, reset } from '../features/feedback/feedbackSlice';
import {
  getComments,
  reset as commentReset,
} from '../features/feedback/commentSlice';
import {
  getUpvotes,
  addUpvote,
  createUpvote,
  reset as upvotesReset,
} from '../features/upvotes/upvoteSlice';

import Marquee from '../components/marquee.component';
import CategoryBox from '../components/categoryBox.component';
import RoadmapBox from '../components/roadmapBox.component';
import TopBarHome from '../components/topBarHome.component';
import ProductFeedback from '../components/productFeedback.component';
import EmptyFeedback from '../components/emptyFeedback.component';
import UserAuth from '../components/userAuth.component';

import '../styles/pages/home.css';
import Sidebar from '../components/sidebar';

const Home = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 738px)' });

  const { feedback, isSuccess } = useSelector((state) => state.feedback);
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
    dispatch(getFeedback());
    dispatch(getComments());
    dispatch(getUpvotes());
  }, [dispatch]);

  useEffect(() => {
    if (feedback) {
      if (sortOrder === 'most-upvotes') {
        const sorted =
          feedback &&
          feedback.length > 0 &&
          feedback.slice().sort((a, b) => b.upvotes - a.upvotes);
        setSortedFeedback(sorted);
      } else if (sortOrder === 'least-upvotes') {
        const sorted = feedback.slice().sort((a, b) => a.upvotes - b.upvotes);
        setSortedFeedback(sorted);
      } else if (sortOrder === 'most-comments') {
        setSortedFeedback(
          _.orderBy(
            feedback,
            function (fdbk) {
              return (
                fdbk.comments &&
                fdbk.comments +
                  _.find(fdbk.comments, (cmnts) =>
                    cmnts.replies === undefined ? 0 : cmnts.replies.length
                  )
              );
            },
            ['asc']
          )
        );
      } else if (sortOrder === 'least-comments') {
        setSortedFeedback(
          _.orderBy(
            feedback,
            function (fdbk) {
              return (
                fdbk.comments &&
                fdbk.comments +
                  _.find(fdbk.comments, (cmnts) =>
                    cmnts.replies === undefined ? 0 : cmnts.replies.length
                  )
              );
            },
            ['desc']
          )
        );
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

  const dispatchUpvotes = (data) => {
    const votes = upvotes.filter(
      (upvote) => upvote.feedbackId === data.upvoteData.feedbackId
    );

    if (votes[0] === undefined) {
      dispatch(createUpvote(data)); // If no upvotes exist, we'll create them
    } else {
      const upvoteId = votes[0]._id;
      dispatch(addUpvote({ upvoteId, ...data })); // If upvotes do exist, we'll add one
    }
  };

  return (
    <div className='Home'>
      <div className='Home-container'>
        <div className='Home-left'>
          <Marquee passIsMenuOpen={passIsMenuOpen} />
          {!isMobile && <CategoryBox />}
          {!isMobile && <RoadmapBox feedback={feedback} />}
          {!isMobile && <UserAuth />}
        </div>
        <div className='Home-right'>
          <Sidebar isMenuOpen={isMenuOpen} feedback={feedback} />
          <TopBarHome passSortOrder={passSortOrder} />
          {feedback.length === 0 ? (
            <EmptyFeedback />
          ) : (
            <>
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
                    upvotes={upvotes
                      .filter((upvote) => upvote.feedbackId === fb._id)
                      .map((upvt) => upvt.upvotes)}
                    dispatchUpvotes={dispatchUpvotes}
                  />
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
