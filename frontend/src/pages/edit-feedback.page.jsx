import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

import {
  getFeedback,
  deleteFeedback,
  updateFeedback,
  reset,
} from '../features/feedback/feedbackSlice';

import CategoryStatusSelect from '../components/categoryStatusSelect.component';

import IconArrowLeft from '../assets/shared/icon-arrow-left.svg';
import IconEditFeedback from '../assets/shared/icon-edit-feedback.svg';

import options from '../options.json';

import '../styles/pages/editFeedbackPage.css';

const EditFeedback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { feedback } = location.state;

  const { isError, isSuccess, message } = useSelector(
    (state) => state.feedback
  );

  const dispatch = useDispatch();
  const { feedbackId } = useParams();

  const [title, setTitle] = useState(feedback.title);
  const [category, setCategory] = useState(
    options['feedback-categories'][
      options['feedback-categories'].indexOf(
        feedback.category.charAt(0).toUpperCase() + feedback.category.slice(1)
      )
    ]
  );
  const [description, setDescription] = useState(feedback.description);
  const [status, setStatus] = useState(
    options['feedback-status'][
      options['feedback-status'].indexOf(
        feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)
      )
    ]
  );
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess) {
      dispatch(reset);
    }

    dispatch(getFeedback(feedbackId));
  }, [dispatch, isError, message, isSuccess, feedbackId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);
    dispatch(
      updateFeedback({
        feedbackId,
        title,
        category,
        description,
        status,
      })
    );
    setTitle('');
    setDescription('');
    setCategory('Feature');
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const onDeleteFeedback = () => {
    dispatch(deleteFeedback(feedbackId));
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='EditFeedbackPage'>
      <div className='EditFeedbackPage-container'>
        <div className='EditFeedbackPage-top-bar'>
          <div
            className='navBack text-grey-blue h4'
            onClick={() => navigate(-1)}>
            <img src={IconArrowLeft} alt='<' /> <span>Go Back</span>
          </div>
        </div>
        <div className='EditFeedbackPage-middle border'>
          <img
            className='EditFeedbackPage-top-image'
            src={IconEditFeedback}
            alt='edit'
            width='56px'
          />
          <h1 className='h1 text-darker-blue'>Editing '{feedback.title}'</h1>
          <form onSubmit={handleSubmit}>
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
              initialCategoryStatus={
                feedback.category === 'ux'
                  ? options['feedback-categories'][
                      options['feedback-categories'].indexOf(
                        feedback.category.toUpperCase()
                      )
                    ]
                  : feedback.category === 'ui'
                  ? options['feedback-categories'][
                      options['feedback-categories'].indexOf(
                        feedback.category.toUpperCase()
                      )
                    ]
                  : options['feedback-categories'][
                      options['feedback-categories'].indexOf(
                        feedback.category.charAt(0).toUpperCase() +
                          feedback.category.slice(1)
                      )
                    ]
              }
              passSelectedOption={(e) => setCategory(e.toLowerCase())}
              submitted={submitted}
            />
            <CategoryStatusSelect
              title='Update Status'
              subtitle='Change feedback state'
              options={options['feedback-status']}
              optionsIndex={status}
              initialCategoryStatus={
                options['feedback-status'][
                  options['feedback-status'].indexOf(
                    feedback.status.charAt(0).toUpperCase() +
                      feedback.status.slice(1)
                  )
                ]
              }
              passSelectedOption={(e) => setStatus(e.toLowerCase())}
              submitted={submitted}
              secondary
            />
            <div className='edit-feedback-detail'>
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
            <div className='edit-feedback-buttons'>
              <button
                className='button button-red border h4 text-very-light'
                onClick={onDeleteFeedback}>
                Delete
              </button>
              <button
                className='button button-dark-blue border h4 text-very-light'
                onClick={() => navigate(-1)}>
                Cancel
              </button>
              <button className='EditFeedback-button button button-purple border h4 text-very-light'>
                Update Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};
export default EditFeedback;
