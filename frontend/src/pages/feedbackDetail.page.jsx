// Libraries
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import uuid from 'react-uuid';

// State
import { getFeedback, reset } from '../features/feedback/feedbackSlice';
import {
  getComments,
  createComment,
  reset as commentsReset,
} from '../features/feedback/commentSlice';

// Components
import Comments from '../components/comments.component';
import ProductFeedback from '../components/productFeedback.component';
import GoBack from '../components/goBack.component';

// Local Data
import userInfo from '../user.json';

// CSS
import '../styles/pages/feedbackPage.css';

const FeedbackDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { feedback } = location.state;
  const { feedbackId } = useParams();

  const { comments, isSuccess: isCommentsSuccess } = useSelector(
    (state) => state.comments
  );
  const { isError, isSuccess, message } = useSelector(
    (state) => state.feedback
  );

  const user = userInfo.currentUser;

  const [repliesLength, setRepliesLength] = useState(0);
  const [content, setContent] = useState('');
  const [textLength, setTextLength] = useState(0);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess) {
      dispatch(reset);
    }

    if (isCommentsSuccess) {
      dispatch(commentsReset);
    }

    dispatch(getFeedback(feedbackId));
    dispatch(getComments(feedbackId));
  }, [dispatch, isError, message, isSuccess, isCommentsSuccess, feedbackId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const commentData = {
      comments: [...comments, { id: uuid(), content, user }],
    };

    dispatch(createComment({ feedbackId, commentData }));

    setContent('');
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    setTextLength(content.length);
  }, [content, textLength]);

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
          <GoBack to='/' styles='text-grey-blue h4' />
          <Link
            to={`/edit-feedback${location.pathname}`}
            state={{ feedback }}
            className='button border h4 text-very-light'>
            Edit Feedback
          </Link>
        </div>
        <ProductFeedback feedback={feedback} comments={comments} />
        <div className='comments-container border'>
          <div className='top'>
            <h3 className='h3 text-darker-blue'>
              {comments ? comments.length + repliesLength : 0}{' '}
              {comments && comments.length + repliesLength === 1
                ? 'Comment'
                : 'Comments'}
            </h3>
          </div>
          <div className='middle'>
            {comments &&
              comments.map((commentItem, index) => (
                <Comments
                  key={commentItem.id}
                  commentProps={commentItem}
                  hrIndex={index}
                />
              ))}
          </div>
        </div>
        <div className='add-comment border'>
          <h3 className='h3 text-darker-blue'>Add Comment</h3>
          <form onSubmit={handleSubmit}>
            <textarea
              className='border body-2 text-darker-blue'
              name='comment'
              id='comment'
              value={content}
              placeholder='Type your comment here'
              onChange={handleChange}></textarea>
            <div className='bottom'>
              <p
                className='body-2'
                style={{ color: textLength > 255 ? 'red' : '#647196' }}>
                {255 - textLength} Characters left
              </p>
              <button className='button border h4 text-very-light'>
                Post Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default FeedbackDetail;

//
