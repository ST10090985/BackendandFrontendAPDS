import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import EmployeeLogin from './components/staff_login';  // Corrected path
import CustomerLogin from './components/login';  // Corrected path

function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route path="/customer-login" element={<CustomerLogin />} />
      </Routes>
    </Router>
  );
}

export default MainRouter;
