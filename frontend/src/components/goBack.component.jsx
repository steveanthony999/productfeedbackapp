import { Link } from 'react-router-dom';

import IconArrowLeft from '../assets/shared/icon-arrow-left.svg';

const GoBack = ({ to, styles }) => {
  return (
    <Link to={to} className={styles}>
      <img src={IconArrowLeft} alt='<' /> <span>Go Back</span>
    </Link>
  );
};
export default GoBack;
