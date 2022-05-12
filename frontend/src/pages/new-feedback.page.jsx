import { Link } from 'react-router-dom';

import IconNewFeedback from '../assets/shared/icon-new-feedback.svg';

import GoBack from '../components/goBack.component';
import CategoryStatusSelect from '../components/categoryStatusSelect.component';

import options from '../options.json';

import '../styles/pages/newFeedbackPage.css';

const NewFeedback = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='NewFeedbackPage'>
      <div className='NewFeedbackPage-container'>
        <div className='NewFeedbackPage-top-bar'>
          <GoBack to='/' styles='text-grey-blue h4' />
        </div>
        <div className='NewFeedbackPage-middle border'>
          <img
            className='NewFeedbackPage-top-icon'
            src={IconNewFeedback}
            alt='+'
          />
          <h1 className='h1 text-darker-blue'>Create New Feedback</h1>
          <form className='NewFeedbackPage-form' onSubmit={handleSubmit}>
            <h4 className='h4 text-darker-blue'>Feedback Title</h4>
            <p className='body-2 text-grey-blue'>
              Add a short, descriptive headline
            </p>
            <input
              type='text'
              className='input-field border body-2 text-darker-blue'
            />
            <CategoryStatusSelect
              title='Category'
              subtitle='Choose a category for your feedback'
              options={options['feedback-categories']}
              initialCategoryStatus='Feature'
            />
            <div className='new-feedback-detail'>
              <h4 className='h4 text-darker-blue'>Feedback Detail</h4>
              <p className='body-2 text-grey-blue'>
                Include any specific comments on what should be improved, added,
                etc.
              </p>
              <textarea className='border body-2 text-darker-blue'></textarea>
            </div>
            <div className='new-feedback-buttons'>
              <Link to='/' className='button border h4 text-very-light'>
                Cancel
              </Link>
              <button className='button border h4 text-very-light'>
                Add Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default NewFeedback;
