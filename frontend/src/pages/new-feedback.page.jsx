import { Link } from 'react-router-dom';

import IconArrowLeft from '../assets/shared/icon-arrow-left.svg';
import IconNewFeedback from '../assets/shared/icon-new-feedback.svg';

const NewFeedback = () => {
  return (
    <div className='NewFeedbackPage'>
      <div className='container'>
        <div className='top-bar'>
          <Link to={'/'} className='text-grey-blue h4'>
            <img src={IconArrowLeft} alt='<' /> <span>Go Back</span>
          </Link>
        </div>
        <div className='middle border'>
          <img src={IconNewFeedback} alt='+' />
          <h1 className='h1 text-darker-blue'>Create New Feedback</h1>
          <form>
            <h4 className='h4 text-darker-blue'>Feedback Title</h4>
            <p className='body-4 text-grey-blue'>
              Add a short, descriptive headline
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default NewFeedback;
