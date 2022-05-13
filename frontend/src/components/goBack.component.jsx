import { Link } from 'react-router-dom';

import IconArrowLeft from '../assets/shared/icon-arrow-left.svg';

const GoBack = ({ to, styles, options }) => {
  return (
    <Link to={to} className={styles}>
      <img
        src={IconArrowLeft}
        alt='<'
        style={{ filter: options === 'darkBg' && 'brightness(100)' }}
      />{' '}
      <span>Go Back</span>
    </Link>
  );
};
export default GoBack;
