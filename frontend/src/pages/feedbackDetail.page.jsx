// Libraries
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import uuid from 'react-uuid';

// State
import { getUsers } from '../features/users/userSlice';

// Components
import Comments from '../components/comments.component';
import ProductFeedback from '../components/productFeedback.component';
import GoBack from '../components/goBack.component';

// CSS
import '../styles/pages/feedbackPage.css';

const FeedbackDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { feedback, comments, replies } = location.state;
  // const { feedbackId } = useParams();

  const { users } = useSelector((state) => state.users);

  // const user = userInfo.currentUser;

  const [content, setContent] = useState('');
  const [textLength, setTextLength] = useState(0);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // const commentData = {
    // comments: [...comments, { id: uuid(), content, user }],
    // comments: [...comments, { id: uuid(), content }],
    // };

    // dispatch(createComment({ feedbackId, commentData }));

    setContent('');
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    setTextLength(content.length);
  }, [content, textLength]);

  return (
    <div className='FeedbackDetailPage'>
      <div className='container'>
        <div className='top-bar'>
          <GoBack to='/' styles='text-grey-blue h4' />
          <Link
            to={`/edit-feedback${location.pathname}`}
            state={{ feedback, replies }}
            className='button border h4 text-very-light'>
            Edit Feedback
          </Link>
        </div>
        <ProductFeedback
          feedback={feedback}
          comments={comments.filter(
            (comment) =>
              (comment.feedbackId === feedback._id &&
                comment.commentId === undefined) ||
              (comment.commentId === null && comment.isReply === false)
          )}
          replies={replies.filter(
            (reply) =>
              reply.feedbackId === feedback._id &&
              reply.commentId !== null &&
              reply.isReply === true
          )}
        />
        <div className='comments-container border'>
          <div className='top'>
            <h3 className='h3 text-darker-blue'>
              {comments ? comments.length + replies.length : 0}{' '}
              {comments && comments.length === 1 ? 'Comment' : 'Comments'}
            </h3>
          </div>
          <div className='middle'>
            {comments &&
              comments.map(
                (comment, index) =>
                  comment !== null && (
                    <Comments
                      key={comment._id}
                      commentProps={comment}
                      hrIndex={index}
                      users={users}
                      user={users.filter((user) => user._id === comment.userId)}
                      replies={replies}
                    />
                  )
              )}
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
