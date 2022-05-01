import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import IconArrowDown from '../assets/shared/icon-arrow-down.svg';
import IconArrowUp from '../assets/shared/icon-arrow-up.svg';
import IconArrowLeft from '../assets/shared/icon-arrow-left.svg';
import IconEditFeedback from '../assets/shared/icon-edit-feedback.svg';
import IconCheck from '../assets/shared/icon-check.svg';

const categoryOptions = ['Feature', 'UI', 'UX', 'Enhancement', 'Bug'];
const statusOptions = ['Suggestion', 'Planned', 'In-Progress', 'Live'];

const EditFeedback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { feedback } = location.state;

  const [feedbackTitle, setFeedbackTitle] = useState(feedback.title);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategoryOption, setSelectedCategoryOption] = useState(
    categoryOptions[
      categoryOptions.indexOf(
        feedback.category.charAt(0).toUpperCase() + feedback.category.slice(1)
      )
    ]
  );
  const [isCategoryChecked, setIsCategoryChecked] = useState(
    feedback.category.charAt(0).toUpperCase() + feedback.category.slice(1)
  );
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [selectedStatusOption, setSelectedStatusOption] = useState(
    statusOptions[0]
  );
  const [isStatusChecked, setIsStatusChecked] = useState('Suggestion');

  const categoryToggling = () => {
    setIsCategoryOpen((prevValue) => !prevValue);
  };

  const onCategoryOptionClicked = (value) => () => {
    setSelectedCategoryOption(value);
    setIsCategoryOpen(false);
    setIsCategoryChecked(value);
    document.removeEventListener('click', () => console.log('kk'));
  };

  const handleBodyClick = () => {
    setIsCategoryOpen(false);
    setIsStatusOpen(false);
  };

  const statusToggling = () => {
    setIsStatusOpen((prevValue) => !prevValue);
  };

  const onStatusOptionClicked = (value) => () => {
    setSelectedStatusOption(value);
    setIsStatusOpen(false);
    setIsStatusChecked(value);
    document.removeEventListener('click', () => console.log('kk'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (isCategoryOpen === true) {
      document.addEventListener('click', handleBodyClick);
    }
    return () => document.removeEventListener('click', handleBodyClick);
  }, [isCategoryOpen]);

  useEffect(() => {
    if (isStatusOpen === true) {
      document.addEventListener('click', handleBodyClick);
    }
    return () => document.removeEventListener('click', handleBodyClick);
  }, [isStatusOpen]);

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
          <img src={IconEditFeedback} alt='edit' width='56px' />
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
            {/* CATEGORY SELECT */}
            <div className='edit-feedback-select-container'>
              <h4 className='h4 text-darker-blue'>Category</h4>
              <p className='body-2 text-grey-blue'>
                Choose a category for your feedback
              </p>
              <div
                className={`select-field border ${
                  isCategoryOpen && 'edit-feedback-select-active'
                }`}
                onClick={categoryToggling}
                style={{ opacity: isCategoryOpen ? 0.8 : 1 }}>
                <span className='body-2 text-darker-blue'>
                  {selectedCategoryOption}
                </span>
                <img
                  src={isCategoryOpen ? IconArrowUp : IconArrowDown}
                  alt='arrow'
                />
              </div>
              {isCategoryOpen && (
                <div className='select-list-container'>
                  <ul className='select-list border'>
                    {categoryOptions.map((option, index) => (
                      <li
                        className='select-list-item body-1'
                        onClick={onCategoryOptionClicked(option)}
                        key={index}>
                        {option}
                        {isCategoryChecked === option && (
                          <img src={IconCheck} alt='check' />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {/* END CATEGORY SELECT */}
            {/* STATUS SELECT */}
            <div className='edit-feedback-select-container'>
              <h4 className='h4 text-darker-blue'>Update Status</h4>
              <p className='body-2 text-grey-blue'>Change feedback state</p>
              <div
                className={`select-field border ${
                  isStatusOpen && 'edit-feedback-select-active'
                }`}
                onClick={statusToggling}
                style={{ opacity: isStatusOpen ? 0.8 : 1 }}>
                <span className='body-2 text-darker-blue'>
                  {selectedStatusOption}
                </span>
                <img
                  src={isStatusOpen ? IconArrowUp : IconArrowDown}
                  alt='arrow'
                />
              </div>
              {isStatusOpen && (
                <div
                  className='select-list-container'
                  style={{ bottom: '-13rem' }}>
                  <ul className='select-list border'>
                    {statusOptions.map((option, index) => (
                      <li
                        className='select-list-item body-1'
                        onClick={onStatusOptionClicked(option)}
                        key={index}>
                        {option}
                        {isStatusChecked === option && (
                          <img src={IconCheck} alt='check' />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {/* END STATUS SELECT */}
            <div className='edit-feedback-detail'>
              <h4 className='h4 text-darker-blue'>Feedback Detail</h4>
              <p className='body-2 text-grey-blue'>
                Include any specific comments on what should be improved, added,
                etc.
              </p>
              <textarea className='border body-2 text-darker-blue'></textarea>
            </div>
            <div className='edit-feedback-buttons'>
              <button className='button border h4 text-very-light'>
                Delete
              </button>
              <button
                className='button border h4 text-very-light'
                onClick={() => navigate(-1)}>
                Cancel
              </button>
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
export default EditFeedback;
