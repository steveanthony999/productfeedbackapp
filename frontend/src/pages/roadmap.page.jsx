import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import IconArrowLeft from '../assets/shared/icon-arrow-left.svg';
import RoadmapCard from '../components/roadmapCard.component';

const Roadmap = () => {
  const location = useLocation();
  const { feedback } = location.state;

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
            <h3 className='h3 text-darker-blue'>
              Planned ({statusCount.planned})
            </h3>
            <p className='body-1 text-grey-blue'>
              Ideas prioritized for research
            </p>
            {feedback
              .filter((fb) => fb.status === 'planned')
              .map((fdbk) => (
                <RoadmapCard key={fdbk.id} />
              ))}
          </div>
          <div>
            <h3 className='h3 text-darker-blue'>
              In-Progress ({statusCount.inProgress})
            </h3>
            <p className='body-1 text-grey-blue'>Currently being developed</p>
            {feedback
              .filter((fb) => fb.status === 'in-progress')
              .map((fdbk) => (
                <RoadmapCard key={fdbk.id} />
              ))}
          </div>
          <div>
            <h3 className='h3 text-darker-blue'>Live ({statusCount.live})</h3>
            <p className='body-1 text-grey-blue'>Released features</p>
            {feedback
              .filter((fb) => fb.status === 'live')
              .map((fdbk) => (
                <RoadmapCard key={fdbk.id} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Roadmap;
