import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiFillCamera } from 'react-icons/ai';

import GoBack from '../components/goBack.component';
import StatsBox from '../components/statsBox.component';

import '../styles/pages/profilePage.css';

const Profile = () => {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <div className='ProfilePage'>
      <div className='ProfilePage-top-container'>
        <div className='ProfilePage-top-bar'>
          <GoBack to='/' styles='text-grey-blue h4' />
          <Link
            to={`/edit-profile`}
            className='button button-blue border h4 text-very-light'>
            Edit Profile
          </Link>
        </div>
        <div className='ProfilePage-container border'>
          <div className='ProfilePage-top'>
            <div className='ProfilePage-user-image-container'>
              <img
                src={currentUser.image}
                alt='user'
                width='100px'
                className='ProfilePage-user-image'
              />
              <div className='ProfilePage-edit-image'>
                <AiFillCamera color='white' />
              </div>
            </div>
            <h1 className='h1 text-darker-blue'>{currentUser.name}</h1>
            <p className='body3 text-grey-blue'>@{currentUser.username}</p>
          </div>
          <hr />
          <div className='ProfilePage-middle'>
            <h4 className='h4-text-darker-blue'>Stats</h4>
            <div className='ProfilePage-stats-container'>
              <StatsBox
                title='Feedback'
                color='text-orange'
                count={currentUser.feedbackId.length}
              />
              <StatsBox
                title='Upvotes'
                color='text-light-purple'
                count={currentUser.upvoteId.length}
              />
              <StatsBox
                title='Comments'
                color='text-light-blue'
                count={currentUser.commentId.length}
              />
            </div>
          </div>
          <div className='ProfilePage-bottom'>
            <div className='body-3 text-blue'>Delete All</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
