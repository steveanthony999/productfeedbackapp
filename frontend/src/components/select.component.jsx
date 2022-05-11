import { useState, useEffect } from 'react';
import IconArrowDown from '../assets/shared/icon-arrow-down.svg';
import IconArrowUp from '../assets/shared/icon-arrow-up.svg';
import IconCheck from '../assets/shared/icon-check.svg';

const Select = ({ passSortOrder, options, origin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [sortOrder, setSortOrder] = useState('most-upvotes');
  const [isChecked, setIsChecked] = useState('Most Upvotes');

  const toggling = () => {
    setIsOpen((prevValue) => !prevValue);
  };

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setSortOrder(value.replace(' ', '-').toLowerCase());
    setIsOpen(false);
    setIsChecked(value);
    document.removeEventListener('click', () => console.log('done'));
  };

  const handleBodyClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen === true) {
      document.addEventListener('click', handleBodyClick);
    }
    return () => document.removeEventListener('click', handleBodyClick);
  }, [isOpen]);

  useEffect(() => {
    passSortOrder(sortOrder);
  }, [sortOrder, passSortOrder]);

  return (
    <>
      <div className='select-container'>
        <div
          className='select-header body-2 text-very-light'
          onClick={toggling}
          style={{ opacity: isOpen ? 0.8 : 1 }}>
          {origin === 'home-top-bar' && 'Sort by : '}
          <span className='h4 text-very-light'>{selectedOption}</span>
          &nbsp;&nbsp;
          <img
            src={isOpen ? IconArrowUp : IconArrowDown}
            alt='arrow'
            className='icon-white'
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
                  {isChecked === option && <img src={IconCheck} alt='check' />}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};
export default Select;
