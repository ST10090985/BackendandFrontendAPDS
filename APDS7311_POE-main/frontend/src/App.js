import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/signup';  // Adjusted path to the components folder
import Login from './components/login';
import Home from './components/home';
import StaffLogin from './components/staff_login';
import PaymentPortal from './components/paymentportal';
import TransactionCheckPoint  from './components/transactioncheckpoint';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/stafflogin" element={<StaffLogin/>} />
          <Route path="/payment" element={<PaymentPortal />} />
          <Route path="/transactioncheckpoint" element={<TransactionCheckPoint />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
