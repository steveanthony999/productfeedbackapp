import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import IconArrowLeft from '../assets/shared/icon-arrow-left.svg';
import IconEditFeedback from '../assets/shared/icon-edit-feedback.svg';

import '../styles/pages/editProfilePage.css';

const EditProfile = () => {
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.auth);

  const [name, setName] = useState(currentUser.name);
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const handleSubmit = (e) => {
    console.log('submitted');
  };

  const onDeleteUser = (e) => {
    console.log('deleted');
  };

  return (
    <div className='EditProfilePage'>
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
            <h4 className='h4 text-darker-blue'>Password</h4>
            <p className='body-2 text-grey-blue'>Change your password</p>
            <input
              type='password'
              className='input-field border body-2 text-darker-blue'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <h4 className='h4 text-darker-blue'>Confirm Password</h4>
            <p className='body-2 text-grey-blue'>Confirm your new password</p>
            <input
              type='password'
              className='input-field border body-2 text-darker-blue'
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
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
    </div>
  );
};
export default EditProfile;
