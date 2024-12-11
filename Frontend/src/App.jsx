import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './Components/login and signup/Signup';
import Login from './Components/login and signup/login';
import FarmerPage from './Components/FarmerPage/FarmerPage';
import ConsumerPage from './Components/ConsumerPage/ConsumerPage';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      try {
        // Check if the stored value is a valid JSON string
        if (loggedInUser !== "undefined") {
          setUser(JSON.parse(loggedInUser));
        } else {
          console.log("User data is undefined in localStorage.");
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);


  const handleLogin = (userData) => {
    setUser(userData.user);  
    localStorage.setItem('user', JSON.stringify(userData.user)); 
  };

  const handleSignup = (userData) => {
    setUser(userData);  
    localStorage.setItem('user', JSON.stringify(userData)); 
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const ProtectedFarmerRoute = ({ children }) => {
    return user && user.role === 'farmer' ? children : <Navigate to="/" />;
  };

  const ProtectedConsumerRoute = ({ children }) => {
    return user && user.role === 'consumer' ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup onLogin={handleSignup} />} />
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/farmer/*"
            element={
              <ProtectedFarmerRoute>
                <FarmerPage />
              </ProtectedFarmerRoute>
            }
          />
          <Route
            path="/consumer/*"
            element={
              <ProtectedConsumerRoute>
                <ConsumerPage />
              </ProtectedConsumerRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;



