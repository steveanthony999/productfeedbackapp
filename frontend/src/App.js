import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home.page';
import FeedbackDetail from './pages/feedbackDetail.page';
import NewFeedback from './pages/new-feedback.page';
import EditFeedback from './pages/edit-feedback.page';

import './styles/styles.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/feedback/:feedbackId' element={<FeedbackDetail />} />
        <Route path='/new-feedback' element={<NewFeedback />} />
        <Route
          path='/edit-feedback/feedback/:feedbackId'
          element={<EditFeedback />}
        />
      </Routes>
    </Router>
  );
}

export default App;
