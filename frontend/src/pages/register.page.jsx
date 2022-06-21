import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaUserAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

import { register, reset } from '../features/auth/authSlice';

import '../styles/pages/registerPage.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, username, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    // Redirect when logged in
    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      console.log('Passwords do not match');
    } else {
      const userData = {
        name,
        username,
        image:
          'https://res.cloudinary.com/dknh8hdvp/image/upload/v1649954298/profilepics/image-suzanne_tkjsnr.jpg',
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='RegisterPage'>
      <div className='RegisterPage-container border'>
        <div className='RegisterPage-icon'>
          <FaUserAlt color='white' />
        </div>
        <h1 className='h1 text-darker-blue'>Register</h1>
        <form onSubmit={onSubmit}>
          <label
            htmlFor='name'
            className='RegisterPage-label h4 text-darker-blue'>
            Name
          </label>
          <input
            type='text'
            className='input-field border body-2 text-darker-blue'
            id='name'
            name='name'
            value={name}
            onChange={onChange}
            placeholder='Enter your name'
            required
          />
          <label
            htmlFor='username'
            className='RegisterPage-label h4 text-darker-blue'>
            Username
          </label>
          <input
            type='text'
            className='input-field border body-2 text-darker-blue'
            id='username'
            name='username'
            value={username}
            onChange={onChange}
            placeholder='Enter your username'
            required
          />
          <label
            htmlFor='email'
            className='RegisterPage-label h4 text-darker-blue'>
            Email
          </label>
          <input
            type='email'
            className='input-field border body-2 text-darker-blue'
            id='email'
            name='email'
            value={email}
            onChange={onChange}
            placeholder='Enter your email'
            required
          />
          <label
            htmlFor='password'
            className='RegisterPage-label h4 text-darker-blue'>
            Password
          </label>
          <input
            type='password'
            className='input-field border body-2 text-darker-blue'
            id='password'
            name='password'
            value={password}
            onChange={onChange}
            placeholder='Enter password'
            required
          />
          <label
            htmlFor='password2'
            className='RegisterPage-label h4 text-darker-blue'>
            Confirm Password
          </label>
          <input
            type='password'
            className='input-field border body-2 text-darker-blue'
            id='password2'
            name='password2'
            value={password2}
            onChange={onChange}
            placeholder='Confirm password'
            required
          />
          <button className='RegisterPage-button button button-purple border h4 text-very-light'>
            Register
          </button>
        </form>
        <div className='RegisterPage-link'>
          <Link to='/login' className='body-3 text-blue'>
            Already have an account?
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
export default Register;
