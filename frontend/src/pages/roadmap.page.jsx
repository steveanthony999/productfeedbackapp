import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { getFeedback, reset } from '../features/feedback/feedbackSlice';

import RoadmapCard from '../components/roadmapCard.component';
import GoBack from '../components/goBack.component';

import '../styles/pages/roadmapPage.css';

const Roadmap = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 738px)' });
  const { feedback, isSuccess } = useSelector((state) => state.feedback);

  const [isActive, setIsActive] = useState('planned');

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getFeedback());
  }, [dispatch]);

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

  const handleClick = (e) => {
    setIsActive(e.target.id);
  };

  if (isMobile) {
    return (
      <div className='RoadmapPage'>
        <div className='RoadmapPage-container'>
          <div className='RoadmapPage-top-bar border'>
            <div className='RoadmapPage-top-bar-container'>
              <div className='RoadmapPage-left'>
                <GoBack to='/' styles='text-white h4' options='darkBg' />
                <h1 className='h1 text-white'>Roadmap</h1>
              </div>
              <div className='RoadmapPage-right'>
                <Link
                  to='/new-feedback'
                  className='button border h4 text-very-light'>
                  + Add Feedback
                </Link>
              </div>
            </div>
          </div>
          <div className='RoadmapPage-nav'>
            <div
              id='planned'
              className='RoadmapPage-nav-category h4 text-darker-blue'
              onClick={handleClick}
              style={{ opacity: isActive === 'planned' ? 1 : 0.4 }}>
              Planned ({statusCount.planned})
            </div>
            <div
              id='in-progress'
              className='RoadmapPage-nav-category h4 text-darker-blue'
              onClick={handleClick}
              style={{ opacity: isActive === 'in-progress' ? 1 : 0.4 }}>
              In-Progress ({statusCount.inProgress})
            </div>
            <div
              id='live'
              className='RoadmapPage-nav-category h4 text-darker-blue'
              onClick={handleClick}
              style={{ opacity: isActive === 'live' ? 1 : 0.4 }}>
              Live ({statusCount.live})
            </div>
          </div>
          <hr />
        </div>
      </div>
    );
  }

  return (
    <div className='RoadmapPage'>
      <div className='RoadmapPage-container'>
        <div className='RoadmapPage-top-bar border'>
          <div className='RoadmapPage-left'>
            <GoBack to='/' styles='text-white h4' options='darkBg' />
            <h1 className='h1 text-white'>Roadmap</h1>
          </div>
          <div className='RoadmapPage-right'>
            <Link
              to='/new-feedback'
              className='button border h4 text-very-light'>
              + Add Feedback
            </Link>
          </div>
        </div>
        <div className='RoadmapPage-middle-container'>
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
                <RoadmapCard
                  key={fdbk.id}
                  status='Planned'
                  color='orange'
                  feedbackId={fdbk.id}
                  title={fdbk.title}
                  description={fdbk.description}
                  category={fdbk.category}
                  upvotes={fdbk.upvotes}
                  commentsLength={fdbk.comments ? fdbk.comments.length : 0}
                />
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
                <RoadmapCard
                  key={fdbk.id}
                  status='In Progress'
                  color='purple'
                  feedbackId={fdbk.id}
                  title={fdbk.title}
                  description={fdbk.description}
                  category={fdbk.category}
                  upvotes={fdbk.upvotes}
                  commentsLength={fdbk.comments ? fdbk.comments.length : 0}
                />
              ))}
          </div>
          <div>
            <h3 className='h3 text-darker-blue'>Live ({statusCount.live})</h3>
            <p className='body-1 text-grey-blue'>Released features</p>
            {feedback
              .filter((fb) => fb.status === 'live')
              .map((fdbk) => (
                <RoadmapCard
                  key={fdbk.id}
                  status='Live'
                  color='light-blue'
                  feedbackId={fdbk.id}
                  title={fdbk.title}
                  description={fdbk.description}
                  category={fdbk.category}
                  upvotes={fdbk.upvotes}
                  commentsLength={fdbk.comments ? fdbk.comments.length : 0}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Roadmap;
