import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import { getFeedback, reset } from '../features/feedback/feedbackSlice';

import Marquee from '../components/marquee.component';
import CategoryBox from '../components/categoryBox.component';
import RoadmapBox from '../components/roadmapBox.component';
import TopBarHome from '../components/topBarHome.component';
import ProductFeedback from '../components/productFeedback.component';
import EmptyFeedback from '../components/emptyFeedback.component';

import '../styles/pages/home.css';

const Home = () => {
  const { feedback, isSuccess } = useSelector((state) => state.feedback);

  const dispatch = useDispatch();

  const [sortOrder, setSortOrder] = useState();
  const [sortedFeedback, setSortedFeedback] = useState(feedback);

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getFeedback());
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

  return (
    <div className='Home'>
      <div className='Home-container'>
        <div className='Home-left'>
          <Marquee />
          <CategoryBox />
          <RoadmapBox feedback={feedback} />
        </div>
        <div className='Home-right'>
          <TopBarHome passSortOrder={passSortOrder} />
          {feedback.length === 0 ? (
            <EmptyFeedback />
          ) : (
            <>
              {sortedFeedback.length > 0 &&
                sortedFeedback.map((feedback) => (
                  <ProductFeedback key={feedback.id} feedback={feedback} />
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
