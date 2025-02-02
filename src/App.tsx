import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EmployeeList from './pages/EmployeeList';
import Error from './pages/Error';

export default function App() {

  return (
    <Router>
        <Routes>          
          <Route path="/" element={<Home />} />
          <Route path="/employee-list" element={<EmployeeList />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
  )
}
