import '../styles/components/statsBox.css';

const StatsBox = ({ title, color, count }) => {
  return (
    <div className='StatsBox border'>
      <div className='StatsBox-top'>
        <h4 className='StatsBox-h4 h4 text-white'>{title}</h4>
      </div>
      <div className='StatsBox-middle'>
        <h1 className={`StatsBox-h1 h1 ${color}`}>{count}</h1>
      </div>
    </div>
  );
};

export default StatsBox;
