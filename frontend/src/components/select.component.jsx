import { useState, useEffect } from 'react';

const options = [
  'Most Upvotes',
  'Least Upvotes',
  'Most Comments',
  'Least Comments',
];

const Select = ({ passSortOrder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [sortOrder, setSortOrder] = useState('most-upvotes');

  const toggling = () => {
    setIsOpen((prevValue) => !prevValue);
  };

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setSortOrder(value.replace(' ', '-').toLowerCase());
    setIsOpen(false);
    document.removeEventListener('click', () => console.log('kk'));
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
  }, [sortOrder]);

  return (
    <>
      <div className='select-container'>
        <div
          className='select-header body-2 text-very-light'
          onClick={toggling}>
          Sort by: <span className='h4 text-very-light'>{selectedOption}</span>
        </div>
        {isOpen && (
          <div className='select-list-container'>
            <ul className='select-list'>
              {options.map((option, index) => (
                <li
                  className='select-list-item body-1'
                  onClick={onOptionClicked(option)}
                  key={index}>
                  {option}
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
