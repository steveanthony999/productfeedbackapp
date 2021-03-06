import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { createFeedback, reset } from '../features/feedback/feedbackSlice';

import IconNewFeedback from '../assets/shared/icon-new-feedback.svg';

import GoBack from '../components/goBack.component';
import CategoryStatusSelect from '../components/categoryStatusSelect.component';

import options from '../options.json';

import '../styles/pages/newFeedbackPage.css';

const NewFeedback = () => {
  const { isError, isSuccess, message } = useSelector(
    (state) => state.feedback
  );

  const { currentUser } = useSelector((state) => state.auth);

  const [category, setCategory] = useState('Feature');
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess) {
      dispatch(reset);
    }

    dispatch(reset);
  }, [dispatch, isError, isSuccess, navigate, message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    dispatch(
      createFeedback({
        userId: currentUser._id,
        title,
        description,
        category,
        status: 'Suggestion',
      })
    );
    setTitle('');
    setDescription('');
    setCategory('Feature');
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const passSelectedOption = (e) => {
    setCategory(e);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='NewFeedbackPage'>
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <CategoryStatusSelect
              title='Category'
              subtitle='Choose a category for your feedback'
              options={options['feedback-categories']}
              optionsIndex={category}
              initialCategoryStatus={category}
              passSelectedOption={passSelectedOption}
              submitted={submitted}
            />
            <div className='new-feedback-detail'>
              <h4 className='h4 text-darker-blue'>Feedback Detail</h4>
              <p className='body-2 text-grey-blue'>
                Include any specific comments on what should be improved, added,
                etc.
              </p>
              <textarea
                className='border body-2 text-darker-blue'
                value={description}
                onChange={(e) => setDescription(e.target.value)}></textarea>
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
    </motion.div>
  );
};
export default NewFeedback;
