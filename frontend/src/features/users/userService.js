import axios from 'axios';

const BACKEND_API_URL = '/api/users/';

// Get all users
const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(BACKEND_API_URL + 'getAll', config);

  return res.data;
};

// Get Single User
const getUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(BACKEND_API_URL + userId, config);

  return res.data;
};

const userService = {
  getUsers,
  getUser,
};

export default userService;
