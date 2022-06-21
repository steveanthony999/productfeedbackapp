import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import IconArrowDown from '../assets/shared/icon-arrow-down.svg';
import IconArrowUp from '../assets/shared/icon-arrow-up.svg';
import IconCheck from '../assets/shared/icon-check.svg';

import '../styles/components/topbarSelect.css';

const TopbarSelect = ({ passSortOrder, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [sortOrder, setSortOrder] = useState('newest');
  const [isChecked, setIsChecked] = useState('Newest');

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
          Sort by : <span className='h4 text-very-light'>{selectedOption}</span>
          &nbsp;&nbsp;
          <img
            src={isOpen ? IconArrowUp : IconArrowDown}
            alt='arrow'
            className='icon-white'
          />
        </div>
        {isOpen && (
          <motion.div
            initial={{ scaleY: 0, originY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            className='select-list-container'>
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
          </motion.div>
        )}
      </div>
    </>
  );
};
export default TopbarSelect;
