import { Link } from 'react-router-dom';
import '../styles/components/statsBox.css';

const StatsBox = ({ title, color }) => {
  return (
    <Link to='/'>
      <div className='StatsBox border'>
        <div className='StatsBox-top'>
          <h4 className='StatsBox-h4 h4 text-white'>{title}</h4>
        </div>
        <div className='StatsBox-middle'>
          <h1 className={`StatsBox-h1 h1 ${color}`}>4</h1>
        </div>
      </div>
    </Link>
  );
};

export default StatsBox;
