import { Link } from 'react-router-dom';

import IconArrowLeft from '../assets/shared/icon-arrow-left.svg';

const Roadmap = () => {
  return (
    <div className='RoadmapPage'>
      <div className='container'>
        <div className='top-bar border'>
          <div className='left'>
            <Link className='navBack text-white h4' to='/'>
              <img src={IconArrowLeft} alt='<' /> <span>Go Back</span>
            </Link>
            <h1 className='h1 text-white'>Roadmap</h1>
          </div>
          <div className='right'>
            <Link
              to='/new-feedback'
              className='button border h4 text-very-light'>
              + Add Feedback
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Roadmap;
