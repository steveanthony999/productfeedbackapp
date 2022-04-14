import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import _ from 'lodash';

import Comments from '../components/comments.component';

import IconArrowLeft from '../assets/shared/icon-arrow-left.svg';
import ProductFeedback from '../components/productFeedback.component';

const FeedbackDetail = () => {
  const location = useLocation();
  const { feedback } = location.state;

  const [repliesLength, setRepliesLength] = useState(0);

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
    <div className='FeedbackDetailPage'>
      <div className='container'>
        <div className='top-bar'>
          <Link to={'/'} className='text-grey-blue h4'>
            <img src={IconArrowLeft} alt='<' /> <span>Go Back</span>
          </Link>
          <Link
            to={`/edit-feedback${location.pathname}`}
            className='button border h4 text-very-light'>
            Edit Feedback
          </Link>
        </div>
        <ProductFeedback feedback={feedback} />
        <div className='comments-container border'>
          <div className='top'>
            <h3 className='h3 text-darker-blue'>
              {feedback.comments.length + repliesLength} Comments
            </h3>
          </div>
          <div className='middle'>
            {feedback.comments &&
              feedback.comments.map((commentItem) => (
                <Comments key={commentItem.id} commentProps={commentItem} />
              ))}
          </div>
        </div>
        <div className='add-comment'>
          <h3>Add Comment</h3>
          <textarea
            name=''
            id=''
            placeholder='Type your comment here'></textarea>
          <p>250 Characters left</p>
          <button>Post Comment</button>
        </div>
      </div>
    </div>
  );
};
export default FeedbackDetail;

//
