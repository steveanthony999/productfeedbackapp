import { Link } from 'react-router-dom';

import Upvotes from './upvotes.component';

import IconComments from '../assets/shared/icon-comments.svg';

import '../styles/components/roadmapCard.css';

const RoadmapCard = ({
  color,
  status,
  feedback,
  user,
  title,
  description,
  category,
  upvotes,
  didCurrentUserUpvote,
  dispatchUpvotes,
  dispatchDownvotes,
  commentsLength,
}) => {
  const fromRoadmap = true;

  return (
    <Link to={`/feedback/${feedback._id}`} state={{ feedback, fromRoadmap }}>
      <div
        className='RoadmapCard border'
        style={{
          borderTop: `6px solid ${
            color === 'orange'
              ? '#f49f85'
              : color === 'purple'
              ? '#AD1FEA'
              : color === 'light-blue' && '#62BCFA'
          }`,
        }}>
        <div className='RoadmapCard-top'>
          <div
            className={`bullet bullet-${
              color === 'orange'
                ? 'orange'
                : color === 'purple'
                ? 'purple'
                : color === 'light-blue' && 'blue'
            }`}></div>
          <p className='text-grey-blue body-1'>{status}</p>
        </div>
        <div className='RoadmapCard-middle'>
          <h3 className='h3 text-darker-blue'>{title}</h3>
          <p className='body-1 text-grey-blue'>{description}</p>
          <div className='btn text-blue body-3'>{category}</div>
        </div>
        <div className='RoadmapCard-bottom'>
          <Upvotes
            feedback={feedback}
            upvotes={
              upvotes.length > 1 ? upvotes[1] : upvotes[0] > 0 ? upvotes[0] : 0
            }
            dispatchUpvotes={dispatchUpvotes}
            dispatchDownvotes={dispatchDownvotes}
            user={user}
            didCurrentUserUpvote={didCurrentUserUpvote}
          />

          <div className='RoadmapCard-comments'>
            <img src={IconComments} alt='bubble' />
            <p className='text-darker-blue h4'>{commentsLength}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default RoadmapCard;
