
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const navigateToEmployee = () => {
    navigate('/stafflogin'); // Route to Employee Login/Sign up
  };

  const navigateToCustomer = () => {
    navigate('/signup'); // Route to Customer Login/Sign up
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 id="welcome-heading">Welcome to Our Service</h1>
        <div className="button-container">
          <button onClick={navigateToEmployee} className="App-button">
            Employee
          </button>
          <button onClick={navigateToCustomer} className="App-button">
            Customer
          </button>
        </div>
      </header>
    </div>
  );
  
}

export default App;
