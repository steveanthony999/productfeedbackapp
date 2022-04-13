import { Link } from 'react-router-dom';

const RoadmapBox = () => {
  return (
    <div className='RoadmapBox border'>
      <div className='RoadmapBox-top'>
        <h3 className='h3 text-darker-blue'>Roadmap</h3>
        <Link to='/roadmap' className='body-3 text-blue'>
          View
        </Link>
      </div>
      <div className='RoadmapBox-middle'>
        <ul className='text-grey-blue'>
          <li>
            <span className='body-1'>
              <div className='bullet bullet-orange'></div>Planned
            </span>
            <span className='h4'>2</span>
          </li>
          <li>
            <span className='body-1'>
              <div className='bullet bullet-purple'></div>In-Progress
            </span>
            <span className='h4'>3</span>
          </li>
          <li>
            <span className='body-1'>
              <div className='bullet bullet-blue'></div>Live
            </span>
            <span className='h4'>1</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default RoadmapBox;
