import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Select from './select.component';

const TopBar = ({ passSortOrder }) => {
  const { feedback } = useSelector((state) => state.feedback);

  return (
    <div className='TopBar'>
      <div className='left'>
        <h3 className='h3 text-white'>{feedback.length} Suggestions</h3>
        <Select passSortOrder={passSortOrder} />
      </div>
      <div className='right'>
        <Link to='/new-feedback'>Add Feedback</Link>
      </div>
    </div>
  );
};
export default TopBar;
