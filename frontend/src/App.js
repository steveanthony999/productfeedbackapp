import { useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  useEffect(() => {
    axios
      .get('https://productfeedbackapp.herokuapp.com/productRequests')
      .then((res) => console.log(res.data));
  }, []);
  return (
    <div className='App'>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
