import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import { getFeedback, reset } from '../features/feedback/feedbackSlice';

import CategoryBox from '../components/categoryBox.component';
import TopBar from '../components/topBar.component';
import ProductFeedback from '../components/productFeedback.component';
import EmptyFeedback from '../components/emptyFeedback.component';

import BackgroundHeaderImg from '../assets/suggestions/desktop/background-header.png';

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
            [
              function (x) {
                return x.comments === undefined ? [] : x.comments;
              },
            ],
            ['desc']
          )
        );
      } else if (sortOrder === 'least-comments') {
        setSortedFeedback(
          _.orderBy(
            feedback,
            [
              function (x) {
                return x.comments === undefined ? [] : x.comments;
              },
            ],
            ['asc']
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
      <div className='container'>
        <div className='left'>
          <div
            className='top border'
            style={{
              background: `url(${BackgroundHeaderImg}) no-repeat center center/cover`,
            }}>
            <h2 className='h2 text-white'>Frontend Mentor</h2>
            <br />
            <p className='body-2 text-white'>Feedback Board</p>
          </div>
          <div className='middle'>
            <CategoryBox />
          </div>
          <div className='bottom'>bottom</div>
        </div>
        <div className='right'>
          <TopBar passSortOrder={passSortOrder} />
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
