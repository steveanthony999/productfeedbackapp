import { useMediaQuery } from 'react-responsive';

import BackgroundHeaderImg from '../assets/suggestions/desktop/background-header.png';

import HamburgerMenu from './hamburgerMenu';

import '../styles/components/marquee.css';
import { Link } from 'react-router-dom';

const Marquee = ({ passIsMenuOpen }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 738px)' });
  const isTablet = useMediaQuery({
    query: '(max-width: 1110px)',
  });

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div
      className='Marquee border'
      style={{
        background: `url(${BackgroundHeaderImg}) no-repeat center center/cover`,
      }}>
      <div>
        {isTablet && !isMobile && (
          <Link to='/profile'>
            <div className='Marquee-top'>
              <div className='Marquee-user-img'>
                <img
                  src={user && user.image}
                  alt='usr'
                  className='user-image'
                  crossOrigin='anonymous'
                />
              </div>
              <div className='Marquee-user-info'>
                <h4 className='h4 text-white'>{user && user.name}</h4>
                <p className='body3 text-white'>@{user && user.username}</p>
              </div>
            </div>
          </Link>
        )}
        <h2 className='Marquee-h2 h2 text-white'>Frontend Mentor</h2>
        <br />
        <p className='Marquee-p body-2 text-white'>Feedback Board</p>
      </div>
      <HamburgerMenu passIsMenuOpen={passIsMenuOpen} />
    </div>
  );
};
export default Marquee;
