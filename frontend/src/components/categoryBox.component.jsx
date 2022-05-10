import { useDispatch } from 'react-redux';
import { getFeedback } from '../features/feedback/feedbackSlice';

import '../styles/components/categoryBox.css';

const Button = ({ name, isChecked }) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.id !== 'All') {
      dispatch(getFeedback(e.target.id.toLowerCase()));
    } else {
      dispatch(getFeedback());
    }
  };

  return (
    <>
      <input
        type='radio'
        name='category'
        id={name}
        value={name}
        defaultChecked={isChecked}
        onChange={handleChange}
      />
      <label className={`btn text-blue body-3`} htmlFor={name}>
        {name}
      </label>
    </>
  );
};

const CategoryBox = () => {
  return (
    <div className='CategoryBox border'>
      <div className='CategoryBox-container'>
        <Button name={'All'} isChecked />
        <Button name={'UI'} />
        <Button name={'UX'} />
        <Button name={'Enhancement'} />
        <Button name={'Bug'} />
        <Button name={'Feature'} />
      </div>
    </div>
  );
};
export default CategoryBox;
