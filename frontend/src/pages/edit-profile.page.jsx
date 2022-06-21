import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { updateProfileInfo } from '../features/auth/authSlice';

import IconArrowLeft from '../assets/shared/icon-arrow-left.svg';
import IconEditFeedback from '../assets/shared/icon-edit-feedback.svg';

import '../styles/pages/editProfilePage.css';

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);

  const userId = currentUser._id;

  const [name, setName] = useState(currentUser.name);
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateProfileInfo({
        userId,
        name,
        username,
        email,
      })
    );

    setName('');
    setUsername('');
    setEmail('');
    setTimeout(() => {
      navigate('/profile');
    }, 1000);
  };

  const onDeleteUser = (e) => {
    console.log('deleted');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='EditProfilePage'>
      <div className='EditProfilePage-container'>
        <div className='EditProfilePage-top-bar'>
          <div
            className='navBack text-grey-blue h4'
            onClick={() => navigate(-1)}>
            <img src={IconArrowLeft} alt='<' /> <span>Go Back</span>
          </div>
        </div>
        <div className='EditProfilePage-middle border'>
          <img
            className='EditProfilePage-top-image'
            src={IconEditFeedback}
            alt='edit'
            width='56px'
          />
          <h1 className='h1 text-darker-blue'>
            Editing {currentUser.name}'s Profile
          </h1>
          <form onSubmit={handleSubmit}>
            <h4 className='h4 text-darker-blue'>Name</h4>
            <p className='body-2 text-grey-blue'>Change your name</p>
            <input
              type='text'
              className='input-field border body-2 text-darker-blue'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <h4 className='h4 text-darker-blue'>Email</h4>
            <p className='body-2 text-grey-blue'>Change your email</p>
            <input
              type='text'
              className='input-field border body-2 text-darker-blue'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h4 className='h4 text-darker-blue'>Username</h4>
            <p className='body-2 text-grey-blue'>Change your username</p>
            <input
              type='text'
              className='input-field border body-2 text-darker-blue'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className='edit-profile-buttons'>
              <button
                className='button button-red border h4 text-very-light'
                onClick={onDeleteUser}>
                Delete
              </button>
              <button
                className='button button-dark-blue border h4 text-very-light'
                onClick={() => navigate(-1)}>
                Cancel
              </button>
              <button className='EditProfile-button button button-purple border h4 text-very-light'>
                Update User
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};
export default EditProfile;
