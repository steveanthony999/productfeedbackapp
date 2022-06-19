import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiFillCamera } from 'react-icons/ai';
import axios from 'axios';

import { getCurrentUser, deleteStats } from '../features/auth/authSlice';
import { updateProfilePhoto } from '../features/auth/authSlice';

import GoBack from '../components/goBack.component';
import StatsBox from '../components/statsBox.component';
import ProfileFeedback from '../components/profileFeedback.component';
import ProfileUpvotes from '../components/profileUpvotes.component';
import ProfileComments from '../components/profileComments.component';

import '../styles/pages/profilePage.css';

const Profile = () => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);

  const userId = currentUser._id;
  const [selectedImage, setSelectedImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [viewState, setViewState] = useState('');

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (selectedImage !== undefined) {
      const formData = new FormData();
      formData.append('file', selectedImage);
      formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
      axios
        .post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        )
        .then((res) => setImageUrl(res.data.secure_url));
    }
  }, [selectedImage]);

  useEffect(() => {
    if (imageUrl !== undefined) {
      dispatch(updateProfilePhoto({ userId, imageUrl }));
      setImageUrl();
    }
  }, [imageUrl]);

  const handleDelete = () => {
    const clearStats = {
      feedbackId: [],
      commentId: [],
      upvoteId: [],
    };

    if (userId) {
      dispatch(deleteStats({ userId, clearStats }));
    }
  };

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
                src={currentUser && currentUser.image && currentUser.image}
                alt='user'
                className='ProfilePage-user-image'
              />
              <label className='ProfilePage-edit-image' htmlFor='profile-image'>
                <AiFillCamera color='white' />
                <input
                  id='profile-image'
                  type='file'
                  hidden
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                />
              </label>
            </div>
            <h1 className='h1 text-darker-blue'>
              {currentUser && currentUser.name && currentUser.name}
            </h1>
            <p className='body3 text-grey-blue'>
              @{currentUser && currentUser.username && currentUser.username}
            </p>
          </div>
          <hr />
          <div className='ProfilePage-middle'>
            <h4 className='h4-text-darker-blue'>Stats</h4>
            <div className='ProfilePage-stats-container'>
              <div onClick={() => setViewState('feedback')}>
                <StatsBox
                  title='Feedback'
                  color='text-orange'
                  count={
                    currentUser &&
                    currentUser.feedbackId &&
                    currentUser.feedbackId.length
                  }
                />
              </div>
              <div onClick={() => setViewState('upvotes')}>
                <StatsBox
                  title='Upvotes'
                  color='text-light-purple'
                  count={
                    currentUser &&
                    currentUser.upvoteId &&
                    currentUser.upvoteId.length
                  }
                />
              </div>
              <div onClick={() => setViewState('comments')}>
                <StatsBox
                  title='Comments'
                  color='text-light-blue'
                  count={
                    currentUser &&
                    currentUser.commentId &&
                    currentUser.commentId.length
                  }
                />
              </div>
            </div>
          </div>
          <div className='ProfilePage-bottom'>
            <div className='body-3 text-blue' onClick={handleDelete}>
              Delete All
            </div>
          </div>
        </div>
        {viewState !== '' && <div onClick={() => setViewState('')}>x</div>}
        {viewState === 'feedback' ? (
          <ProfileFeedback fucSelector='feedback' />
        ) : viewState === 'upvotes' ? (
          <ProfileFeedback fucSelector='upvotes' />
        ) : (
          viewState === 'comments' && <ProfileFeedback fucSelector='comments' />
        )}
      </div>
    </div>
  );
};
export default Profile;
