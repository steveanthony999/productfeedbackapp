// Loader courtesy of the Net Ninja
// https://www.youtube.com/watch?v=uxjMjXNZV_4

import { motion } from 'framer-motion';

import '../styles/components/loader.css';

const variant = {
  animationOne: {
    x: [-20, 20],
    y: [0, -30],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 0.5,
      },
      y: {
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 0.25,
        ease: 'easeOut',
      },
    },
  },
};

const Loader = () => {
  return (
    <motion.div
      className='loader'
      variants={variant}
      animate='animationOne'></motion.div>
  );
};

export default Loader;
