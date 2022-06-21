import Loader from './loader.component';

import '../styles/components/loadingHome.css';

const LoadingHome = () => {
  return (
    <div className='LoadingHome'>
      <div className='LoadingHome-container'>
        <Loader />
        <h1 className='LoadingHome-h1 h1 text-darker-blue'>Loading...</h1>
      </div>
    </div>
  );
};
export default LoadingHome;
