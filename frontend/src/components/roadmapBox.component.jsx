import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RoadmapBox = ({ feedback }) => {
  const [statusCount, setStatusCount] = useState({
    planned: 0,
    inProgress: 0,
    live: 0,
  });

  useEffect(() => {
    const plannedLength = feedback.filter((fb) => {
      if (fb.status === 'planned') {
        return true;
      }
    }).length;

    const inProgressLength = feedback.filter((fb) => {
      if (fb.status === 'in-progress') {
        return true;
      }
    }).length;

    const liveLength = feedback.filter((fb) => {
      if (fb.status === 'live') {
        return true;
      }
    }).length;

    setStatusCount({
      ...statusCount,
      planned: plannedLength,
      inProgress: inProgressLength,
      live: liveLength,
    });
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
            <span className='h4'>{statusCount.planned}</span>
          </li>
          <li>
            <span className='body-1'>
              <div className='bullet bullet-purple'></div>In-Progress
            </span>
            <span className='h4'>{statusCount.inProgress}</span>
          </li>
          <li>
            <span className='body-1'>
              <div className='bullet bullet-blue'></div>Live
            </span>
            <span className='h4'>{statusCount.live}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default RoadmapBox;
