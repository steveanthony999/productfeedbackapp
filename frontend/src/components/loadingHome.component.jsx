import { motion } from 'framer-motion';

import Loader from './loader.component';

import '../styles/components/loadingHome.css';

const LoadingHome = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <div className='LoadingHome'>
      <div className='LoadingHome-container'>
        <Loader />
        <motion.h1
          variants={container}
          initial='hidden'
          animate='show'
          className='LoadingHome-h1 h1 text-darker-blue'>
          <motion.span variants={item}>L</motion.span>
          <motion.span variants={item}>o</motion.span>
          <motion.span variants={item}>a</motion.span>
          <motion.span variants={item}>d</motion.span>
          <motion.span variants={item}>i</motion.span>
          <motion.span variants={item}>n</motion.span>
          <motion.span variants={item}>g</motion.span>
          <motion.span variants={item}>.</motion.span>
          <motion.span variants={item}>.</motion.span>
          <motion.span variants={item}>.</motion.span>
        </motion.h1>
      </div>
    </div>
  );
};
export default LoadingHome;
