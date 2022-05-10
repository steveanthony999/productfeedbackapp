import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import _ from 'lodash';

import Comments from '../components/comments.component';

import IconArrowLeft from '../assets/shared/icon-arrow-left.svg';
import ProductFeedback from '../components/productFeedback.component';

import '../styles/pages/feedbackPage.css';

const FeedbackDetail = () => {
  const location = useLocation();
  const { feedback } = location.state;

  const [repliesLength, setRepliesLength] = useState(0);
  const [text, setText] = useState('');
  const [textLength, setTextLength] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    setText('');
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    setTextLength(text.length);
  }, [text, textLength]);

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
            state={{ feedback }}
            className='button border h4 text-very-light'>
            Edit Feedback
          </Link>
        </div>
        <ProductFeedback feedback={feedback} />
        <div className='comments-container border'>
          <div className='top'>
            <h3 className='h3 text-darker-blue'>
              {feedback.comments ? feedback.comments.length + repliesLength : 0}{' '}
              {feedback.comments &&
              feedback.comments.length + repliesLength === 1
                ? 'Comment'
                : 'Comments'}
            </h3>
          </div>
          <div className='middle'>
            {feedback.comments &&
              feedback.comments.map((commentItem, index) => (
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
              value={text}
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
