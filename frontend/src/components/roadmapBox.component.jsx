import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RoadmapBox = ({ feedback }) => {
  const [plannedCount, setPlannedCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [liveCount, setLiveCount] = useState(0);

  useEffect(() => {
    setPlannedCount(
      feedback.filter((fb) => {
        if (fb.status === 'planned') {
          return true;
        }

        return false;
      }).length
    );

    setInProgressCount(
      feedback.filter((fb) => {
        if (fb.status === 'in-progress') {
          return true;
        }

        return false;
      }).length
    );

    setLiveCount(
      feedback.filter((fb) => {
        if (fb.status === 'live') {
          return true;
        }

        return false;
      }).length
    );
  }, [feedback]);

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
            <span className='h4'>{plannedCount}</span>
          </li>
          <li>
            <span className='body-1'>
              <div className='bullet bullet-purple'></div>In-Progress
            </span>
            <span className='h4'>{inProgressCount}</span>
          </li>
          <li>
            <span className='body-1'>
              <div className='bullet bullet-blue'></div>Live
            </span>
            <span className='h4'>{liveCount}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default RoadmapBox;
