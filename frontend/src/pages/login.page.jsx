import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaUserAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

import { login, reset } from '../features/auth/authSlice';

import '../styles/pages/loginPage.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccess, message, isError } = useSelector(
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

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='LoginPage'>
      <div className='LoginPage-container border'>
        <div className='LoginPage-icon'>
          <FaUserAlt color='white' />
        </div>
        <h1 className='h1 text-darker-blue'>Login</h1>
        <form onSubmit={onSubmit}>
          <label
            htmlFor='email'
            className='LoginPage-label h4 text-darker-blue'>
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
            className='LoginPage-label h4 text-darker-blue'>
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
          <button className='LoginPage-button button button-purple border h4 text-very-light'>
            Login
          </button>
        </form>
        <div className='LoginPage-link'>
          <Link to='/register' className='body-3 text-blue'>
            Need an account?
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
export default Login;
