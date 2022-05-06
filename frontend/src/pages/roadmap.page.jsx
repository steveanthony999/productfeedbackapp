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
        <div className='middle-container'>
          <div>
            <h3 className='h3 text-darker-blue'>Planned</h3>
            <p className='body-1 text-grey-blue'>
              Ideas prioritized for research
            </p>
          </div>
          <div>
            <h3 className='h3 text-darker-blue'>In-Progress</h3>
            <p className='body-1 text-grey-blue'>Currently being developed</p>
          </div>
          <div>
            <h3 className='h3 text-darker-blue'>Live</h3>
            <p className='body-1 text-grey-blue'>Released features</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Roadmap;
