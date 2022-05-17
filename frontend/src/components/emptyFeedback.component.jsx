import { Link } from 'react-router-dom';
import IllustrationEmpty from '../assets/suggestions/illustration-empty.svg';

import '../styles/components/emptyFeedback.css';

const EmptyFeedback = () => {
  return (
    <div className='EmptyFeedback border'>
      <div className='container'>
        <img src={IllustrationEmpty} alt='empty' width='130px' />
        <h1 className='h1 text-darker-blue'>There is no feedback yet.</h1>
        <p>
          Got a suggestion? Found a bug that needs to be squashed? We love
          hearing about new ideas to improve our app.
        </p>
        <Link
          to='/new-feedback'
          className='button button-purple border h4 text-very-light'>
          + Add Feedback
        </Link>
      </div>
    </div>
  );
};
export default EmptyFeedback;
