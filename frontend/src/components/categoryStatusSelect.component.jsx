import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import IconArrowDown from '../assets/shared/icon-arrow-down.svg';
import IconArrowUp from '../assets/shared/icon-arrow-up.svg';
import IconCheck from '../assets/shared/icon-check.svg';

import '../styles/components/categoryStatusSelect.css';

const CategoryStatusSelect = ({
  title,
  subtitle,
  options,
  optionsIndex,
  initialCategoryStatus,
  secondary,
  passSelectedOption,
  submitted,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    initialCategoryStatus === undefined
      ? 'In-Progress'
      : initialCategoryStatus === 'UX'
      ? 'UX'
      : initialCategoryStatus === 'UI'
      ? 'UI'
      : options[optionsIndex ? options.indexOf(optionsIndex) : 0]
  );
  const [isChecked, setIsChecked] = useState(
    initialCategoryStatus === undefined ? 'In-Progress' : initialCategoryStatus
  );

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

  useEffect(() => {
    if (isOpen === true) {
      document.addEventListener('click', handleBodyClick);
    }
    return () => document.removeEventListener('click', handleBodyClick);
  }, [isOpen]);

  useEffect(() => {
    passSelectedOption(selectedOption);
  }, [selectedOption, passSelectedOption]);

  useEffect(() => {
    if (submitted) {
      setSelectedOption(options[0]);
      setIsChecked(options[0]);
    }
  }, [submitted, options]);

  return (
    <div className='category-status-select-container'>
      <h4 className='h4 text-darker-blue'>{title}</h4>
      <p className='body-2 text-grey-blue'>{subtitle}</p>
      <div
        tabIndex='0'
        className={`category-status-select-field border ${
          isOpen && 'category-status-select-active'
        }`}
        onKeyDown={(e) => e.key === 'Enter' && toggling()}
        onClick={toggling}
        style={{ opacity: isOpen ? 0.8 : 1 }}>
        <span className='body-2 text-darker-blue'>{selectedOption}</span>
        <img
          className='category-status-select-field-img'
          src={isOpen ? IconArrowUp : IconArrowDown}
          alt='arrow'
        />
      </div>
      {isOpen && (
        <motion.div
          initial={{ scaleY: 0, originY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          className='category-status-select-list-container'
          style={{ bottom: secondary === true && '-13rem' }}>
          <ul className='category-status-select-list border'>
            {options.map((option, index) => (
              <li
                className='category-status-select-list-item body-1'
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
  );
};
export default CategoryStatusSelect;
