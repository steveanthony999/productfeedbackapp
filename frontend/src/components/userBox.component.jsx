import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logout, reset } from '../features/auth/authSlice';

import '../styles/components/userBox.css';

const UserBox = ({ user, feedbackLength, upvotesLength, commentsLength }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  return (
    <div className='UserBox border'>
      <Link to='/profile'>
        <div className='UserBox-container'>
          <div className='UserBox-top'>
            <div className='UserBox-user-img'>
              <img
                src={user && user.image}
                alt='usr'
                className='user-image'
                crossOrigin='anonymous'
              />
            </div>
            <div className='UserBox-user-info'>
              <h4 className='h4 text-darker-blue'>{user && user.name}</h4>
              <p className='body3 text-grey-blue'>@{user && user.username}</p>
            </div>
          </div>
          <div className='UserBox-middle'>
            <ul className='UserBox-ul text-grey-blue'>
              <li className='UserBox-li'>
                <span className='UserBox-span body-1'>
                  <div className='bullet bullet-orange'></div>Feedback
                </span>
                <span className='h4'>{feedbackLength}</span>
              </li>
              <li className='UserBox-li'>
                <span className='UserBox-span body-1'>
                  <div className='bullet bullet-purple'></div>Upvotes
                </span>
                <span className='h4'>{upvotesLength}</span>
              </li>
              <li className='UserBox-li'>
                <span className='UserBox-span body-1'>
                  <div className='bullet bullet-blue'></div>Comments
                </span>
                <span className='h4'>{commentsLength}</span>
              </li>
            </ul>
          </div>
        </div>
      </Link>
      <button
        onClick={onLogout}
        className='UserBox-button button button-purple border h4 text-very-light'>
        Logout
      </button>
    </div>
  );
};
export default UserBox;
