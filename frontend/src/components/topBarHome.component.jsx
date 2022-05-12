import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TopbarSelect from './topbarSelect.component';

import SuggestionsIcon from '../assets/suggestions/icon-suggestions.svg';

import options from '../options.json';

import '../styles/helpers/globals.css';
import '../styles/components/topBarHome.css';

const TopBarHome = ({ passSortOrder }) => {
  const { feedback } = useSelector((state) => state.feedback);

  return (
    <div className='TopBarHome border'>
      <div className='TopBarHome-left'>
        <img src={SuggestionsIcon} alt='bulb' />
        <h3 className='h3 text-white'>{feedback.length} Suggestions</h3>
        <TopbarSelect
          options={options['home-top-bar-options']}
          passSortOrder={passSortOrder}
          origin='home-top-bar'
        />
      </div>
      <div className='TopBarHome-right'>
        <Link to='/new-feedback'>
          <button className='button button-purple border h4 text-very-light'>
            + Add Feedback
          </button>
        </Link>
      </div>
    </div>
  );
};
export default TopBarHome;
