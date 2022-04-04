import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TopBar = ({ passSortOrder }) => {
  const [sortOrder, setSortOrder] = useState('most-upvotes');

  const { feedback, isLoading, isSuccess } = useSelector(
    (state) => state.feedback
  );

  useEffect(() => {
    passSortOrder(sortOrder);
  }, [sortOrder]);

  const handleChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className='TopBar'>
      <div className='left'>{feedback.length} Suggestions</div>
      <div className='middle'>
        <label htmlFor='sort'>Sort by:</label>

        <select name='sort' id='sort' onChange={handleChange}>
          <option value='most-upvotes'>Most Upvotes</option>
          <option value='least-upvotes'>Least Upvotes</option>
          <option value='most-comments'>Most Comments</option>
          <option value='least-comments'>Least Comments</option>
        </select>
      </div>
      <div className='right'>
        <Link to='/new-feedback'>Add Feedback</Link>
      </div>
    </div>
  );
};
export default TopBar;
