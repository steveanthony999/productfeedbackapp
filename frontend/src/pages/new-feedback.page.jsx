import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import IconArrowDown from '../assets/shared/icon-arrow-down.svg';
import IconArrowUp from '../assets/shared/icon-arrow-up.svg';
import IconNewFeedback from '../assets/shared/icon-new-feedback.svg';
import IconCheck from '../assets/shared/icon-check.svg';

import '../styles/pages/newFeedbackPage.css';
import GoBack from '../components/goBack.component';

const options = ['Feature', 'UI', 'UX', 'Enhancement', 'Bug'];

const NewFeedback = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isChecked, setIsChecked] = useState('Feature');

  const toggling = () => {
    setIsOpen((prevValue) => !prevValue);
  };

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    setIsChecked(value);
    document.removeEventListener('click', () => console.log('done'));
  };

  const handleBodyClick = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (isOpen === true) {
      document.addEventListener('click', handleBodyClick);
    }
    return () => document.removeEventListener('click', handleBodyClick);
  }, [isOpen]);

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
            {/* SELECT */}
            <div className='new-feedback-select-container'>
              <h4 className='h4 text-darker-blue'>Category</h4>
              <p className='body-2 text-grey-blue'>
                Choose a category for your feedback
              </p>
              <div
                className={`select-field border ${
                  isOpen && 'new-feedback-select-active'
                }`}
                onClick={toggling}
                style={{ opacity: isOpen ? 0.8 : 1 }}>
                <span className='body-2 text-darker-blue'>
                  {selectedOption}
                </span>
                <img
                  className='select-field-img'
                  src={isOpen ? IconArrowUp : IconArrowDown}
                  alt='arrow'
                />
              </div>
              {isOpen && (
                <div className='select-list-container'>
                  <ul className='select-list border'>
                    {options.map((option, index) => (
                      <li
                        className='select-list-item body-1'
                        onClick={onOptionClicked(option)}
                        key={index}>
                        {option}
                        {isChecked === option && (
                          <img src={IconCheck} alt='check' />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {/* END SELECT */}
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
