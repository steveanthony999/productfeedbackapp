import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import CategoryBox from './categoryBox.component';
import UserBox from '../components/userBox.component';

import '../styles/components/sidebar.css';
import RoadmapBox from './roadmapBox.component';

const Sidebar = ({ isMenuOpen, feedback }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 738px)' });

  const user = JSON.parse(localStorage.getItem('user'));

  const { currentUser } = useSelector((state) => state.auth);

  return (
    <div className='Sidebar' style={{ right: isMenuOpen ? 0 : '-100vw' }}>
      <div className='Sidebar-container'>
        {isMobile && <CategoryBox />}
        {isMobile && <RoadmapBox feedback={feedback} />}
        {isMobile && (
          <UserBox
            user={user}
            feedbackLength={
              currentUser &&
              currentUser.feedbackId &&
              currentUser.feedbackId.length
            }
            upvotesLength={
              currentUser && currentUser.upvoteId && currentUser.upvoteId.length
            }
            commentsLength={
              currentUser &&
              currentUser.commentId &&
              currentUser.commentId.length
            }
          />
        )}
      </div>
    </div>
  );
};
export default Sidebar;
