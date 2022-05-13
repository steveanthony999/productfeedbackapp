import BackgroundHeaderImg from '../assets/suggestions/desktop/background-header.png';

import '../styles/components/marquee.css';

const Marquee = () => {
  return (
    <div
      className='Marquee border'
      style={{
        background: `url(${BackgroundHeaderImg}) no-repeat center center/cover`,
      }}>
      <h2 className='Marquee-h2 h2 text-white'>Frontend Mentor</h2>
      <br />
      <p className='Marquee-p body-2 text-white'>Feedback Board</p>
    </div>
  );
};
export default Marquee;