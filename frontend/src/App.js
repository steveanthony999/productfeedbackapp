import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home.page';
import FeedbackDetail from './pages/feedbackDetail.page';

import './styles/styles.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/feedback/:feedbackId' element={<FeedbackDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
