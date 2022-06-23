import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { AnimatePresence, motion } from 'framer-motion';

import CategoryBox from './categoryBox.component';
import UserBox from '../components/userBox.component';

import '../styles/components/sidebar.css';
import RoadmapBox from './roadmapBox.component';

const Sidebar = ({ isMenuOpen, feedback }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 738px)' });

  const user = JSON.parse(localStorage.getItem('user'));

  const { currentUser } = useSelector((state) => state.auth);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className='Sidebar'
        style={{ right: isMenuOpen ? 0 : '-100vw' }}>
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
                currentUser &&
                currentUser.upvoteId &&
                currentUser.upvoteId.length
              }
              commentsLength={
                currentUser &&
                currentUser.commentId &&
                currentUser.commentId.length
              }
            />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
export default Sidebar;
