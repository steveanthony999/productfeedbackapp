import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Select from './select.component';

import SuggestionsIcon from '../assets/suggestions/icon-suggestions.svg';

const TopBar = ({ passSortOrder }) => {
  const { feedback } = useSelector((state) => state.feedback);

  return (
    <div className='TopBar border'>
      <div className='left'>
        <img src={SuggestionsIcon} alt='bulb' />
        <h3 className='h3 text-white'>{feedback.length} Suggestions</h3>
        <Select passSortOrder={passSortOrder} />
      </div>
      <div className='right'>
        <Link to='/new-feedback' className='button border h4 text-very-light'>
          + Add Feedback
        </Link>
      </div>
    </div>
  );
};
export default TopBar;
