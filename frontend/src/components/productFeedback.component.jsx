import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const ProductFeedback = ({ feedback }) => {
  const [commentsLength, setCommentsLength] = useState([]);

  useEffect(() => {
    _.find(
      feedback,
      feedback.comments
        ? setCommentsLength(feedback.comments.length)
        : setCommentsLength(0)
    );
  }, [feedback]);

  return (
    <Link to={`/feedback/${feedback.id}`} state={{ feedback }}>
      <div className='ProductFeedback'>
        <div className='container'>
          <div className='left'>
            <p>{feedback.upvotes}</p>
          </div>
          <div className='middle'>
            <h3 className='h3'>{feedback.title}</h3>
            <p className='body-1'>{feedback.description}</p>
            <div className='btn text-blue body-3'>{feedback.category}</div>
          </div>
          <div className='right'>{commentsLength}</div>
        </div>
      </div>
    </Link>
  );
};
export default ProductFeedback;
