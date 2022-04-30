import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import IconArrowLeft from '../assets/shared/icon-arrow-left.svg';
import IconEditFeedback from '../assets/shared/icon-edit-feedback.svg';

const EditFeedback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { feedback } = location.state;

  const [feedbackTitle, setFeedbackTitle] = useState(feedback.title);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='EditFeedbackPage'>
      <div className='container'>
        <div className='top-bar'>
          <div
            className='navBack text-grey-blue h4'
            onClick={() => navigate(-1)}>
            <img src={IconArrowLeft} alt='<' /> <span>Go Back</span>
          </div>
        </div>
        <div className='middle border'>
          <img src={IconEditFeedback} alt='edit' />
          <h1 className='h1 text-darker-blue'>Editing '{feedback.title}'</h1>
          <form onSubmit={handleSubmit}>
            <h4 className='h4 text-darker-blue'>Feedback Title</h4>
            <p className='body-2 text-grey-blue'>
              Add a short, descriptive headline
            </p>
            <input
              type='text'
              className='border body-2 text-darker-blue'
              value={feedbackTitle}
              onChange={(e) => setFeedbackTitle(e.target.value)}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditFeedback;
