import { useMediaQuery } from 'react-responsive';

import CategoryBox from './categoryBox.component';

import '../styles/components/sidebar.css';
import RoadmapBox from './roadmapBox.component';

const Sidebar = ({ isMenuOpen, feedback }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 738px)' });

  return (
    <div className='Sidebar' style={{ right: isMenuOpen ? 0 : '-100vw' }}>
      <div className='Sidebar-container'>
        {isMobile && <CategoryBox />}
        {isMobile && <RoadmapBox feedback={feedback} />}
      </div>
    </div>
  );
};
export default Sidebar;
