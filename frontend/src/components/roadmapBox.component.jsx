import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/components/roadmapBox.css';

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
      return false;
    }).length;

    const inProgressLength = feedback.filter((fb) => {
      if (fb.status === 'in-progress') {
        return true;
      }
      return false;
    }).length;

    const liveLength = feedback.filter((fb) => {
      if (fb.status === 'live') {
        return true;
      }
      return false;
    }).length;

    setStatusCount({
      ...statusCount,
      planned: plannedLength,
      inProgress: inProgressLength,
      live: liveLength,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <ul className='RoadmapBox-ul text-grey-blue'>
          <li className='RoadmapBox-li'>
            <span className='RoadmapBox-span body-1'>
              <div className='bullet bullet-orange'></div>Planned
            </span>
            <span className='h4'>{statusCount.planned}</span>
          </li>
          <li className='RoadmapBox-li'>
            <span className='RoadmapBox-span body-1'>
              <div className='bullet bullet-purple'></div>In-Progress
            </span>
            <span className='h4'>{statusCount.inProgress}</span>
          </li>
          <li className='RoadmapBox-li'>
            <span className='RoadmapBox-span body-1'>
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
