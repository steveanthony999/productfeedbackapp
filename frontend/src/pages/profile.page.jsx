import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiFillCamera } from 'react-icons/ai';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimesCircle } from 'react-icons/fa';

import { getCurrentUser, deleteStats } from '../features/auth/authSlice';
import { updateProfilePhoto } from '../features/auth/authSlice';

import GoBack from '../components/goBack.component';
import StatsBox from '../components/statsBox.component';
import ProfileFeedback from '../components/profileFeedback.component';

import '../styles/pages/profilePage.css';

const Profile = () => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);

  const userId = currentUser._id;
  const [selectedImage, setSelectedImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [viewState, setViewState] = useState('');

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

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
  }, [imageUrl, dispatch, userId]);

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='ProfilePage'>
      <div className='ProfilePage-top-container'>
        <div className='ProfilePage-top-bar'>
          <GoBack to='/' styles='text-grey-blue h4' />
          <Link
            to={`/edit-profile`}
            className='button button-blue border h4 text-very-light'>
            Edit Profile
          </Link>
        </div>
        <motion.div
          initial={{ y: 0, height: '540px', background: '#ffffff' }}
          animate={{
            y: viewState !== '' ? -65 : 0,
            height: viewState !== '' ? '200px' : '540px',
            background: viewState !== '' ? '#3a4374ee' : '#ffffff',
          }}
          className='ProfilePage-container border'>
          <div className='ProfilePage-top'>
            <motion.div
              initial={{ x: 0, y: 0, scale: 1 }}
              animate={{
                x: viewState !== '' ? -190 : 0,
                y: viewState !== '' ? 75 : 0,
                scale: viewState !== '' ? 0.8 : 1,
              }}
              className='ProfilePage-user-image-container'>
              <motion.img
                initial={{ border: '0px solid #ffffff00' }}
                animate={{
                  border:
                    viewState !== ''
                      ? '6px solid #ffffff'
                      : '0px solid #ffffff00',
                }}
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
            </motion.div>
            <motion.h1
              initial={{ x: 0, y: 0, color: '#3a4374' }}
              animate={{
                x: viewState !== '' ? 150 : 0,
                y: viewState !== '' ? -25 : 0,
                color: viewState !== '' ? '#ffffff' : '#3a4374',
              }}
              className='h1 text-darker-blue'>
              {currentUser && currentUser.name && currentUser.name}
            </motion.h1>
            <motion.p
              initial={{ x: 0, color: '#647196' }}
              animate={{
                x: viewState !== '' ? 192 : 0,
                y: viewState !== '' ? -25 : 0,
                color: viewState !== '' ? '#ffffff' : '#647196',
              }}
              className='body3 text-grey-blue'>
              @{currentUser && currentUser.username && currentUser.username}
            </motion.p>
          </div>
          <motion.hr
            initial={{ visibility: 'visible' }}
            animate={{
              visibility: viewState !== '' ? 'hidden' : 'visible',
            }}
          />
          <motion.div
            initial={{ y: 0, x: 0, scale: 1 }}
            animate={{
              y: viewState !== '' ? -130 : 0,
              x: viewState !== '' ? 90 : 0,
              scale: viewState !== '' ? 0.75 : 1,
            }}
            className='ProfilePage-middle'>
            <motion.h4
              initial={{ visibility: 'visible' }}
              animate={{
                visibility: viewState !== '' ? 'hidden' : 'visible',
              }}
              className='h4-text-darker-blue ProfilePage-middle-h4'>
              Stats
            </motion.h4>
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
          </motion.div>
          <motion.div
            initial={{ visibility: 'visible' }}
            animate={{ visibility: viewState !== '' ? 'hidden' : 'visible' }}
            className='ProfilePage-bottom'>
            <div className='body-3 text-blue' onClick={handleDelete}>
              Delete All
            </div>
          </motion.div>
        </motion.div>
        <AnimatePresence>
          {viewState !== '' && (
            <motion.div
              key='button-container'
              variants={container}
              initial='hidden'
              animate='show'
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className='ProfilePage-close-button-container'>
              <h3 className='h3 text-darker-blue'>
                Viewing {currentUser.name}'s{' '}
                {viewState === 'feedback'
                  ? 'feedback'
                  : viewState === 'upvotes'
                  ? 'upvotes'
                  : viewState === 'comments' && 'comments'}
              </h3>
              <motion.div
                whileHover={{ scale: 0.8 }}
                onClick={() => setViewState('')}>
                <FaTimesCircle size={30} color='#3a4374' />
              </motion.div>
            </motion.div>
          )}
          {viewState === 'feedback' ? (
            <motion.div variants={container} initial='hidden' animate='show'>
              <ProfileFeedback fucSelector='feedback' />
            </motion.div>
          ) : viewState === 'upvotes' ? (
            <motion.div variants={container} initial='hidden' animate='show'>
              <ProfileFeedback fucSelector='upvotes' />
            </motion.div>
          ) : (
            viewState === 'comments' && (
              <motion.div variants={container} initial='hidden' animate='show'>
                <ProfileFeedback fucSelector='comments' />
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
export default Profile;
