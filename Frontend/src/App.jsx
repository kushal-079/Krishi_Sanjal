import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './Components/login and signup/Signup';
import Login from './Components/login and signup/login';
import FarmerPage from './Components/FarmerPage/FarmerPage';
import ConsumerPage from './Components/ConsumerPage/ConsumerPage';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch('http://localhost:5000/verify-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user); // Set the user if the token is valid
        } else {
          localStorage.removeItem('token'); // Remove invalid token
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData.user);  
    localStorage.setItem('user', JSON.stringify(userData.user));
    localStorage.setItem('token', userData.token); // Store the token
  };

  const handleSignup = (userData) => {
    setUser(userData);  
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userData.token); // Store the token
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const ProtectedFarmerRoute = ({ children }) => {
    return user && user.role === 'farmer' ? children : <Navigate to="/" />;
  };

  const ProtectedConsumerRoute = ({ children }) => {
    return user && user.role === 'consumer' ? children : <Navigate to="/" />;
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner while verifying the token
  }







  //   const loggedInUser = localStorage.getItem('user');
  //   if (loggedInUser) {
  //     try {
  //       // Check if the stored value is a valid JSON string
  //       if (loggedInUser !== "undefined") {
  //         setUser(JSON.parse(loggedInUser));
  //       } else {
  //         console.log("User data is undefined in localStorage.");
  //       }
  //     } catch (error) {
  //       console.error("Error parsing user data from localStorage:", error);
  //     }
  //   }
  // }, []);


  // const handleLogin = (userData) => {
  //   setUser(userData.user);  
  //   localStorage.setItem('user', JSON.stringify(userData.user)); 
  // };

  // const handleSignup = (userData) => {
  //   setUser(userData);  
  //   localStorage.setItem('user', JSON.stringify(userData)); 
  // };

  // const handleLogout = () => {
  //   setUser(null);
  //   localStorage.removeItem('user');
  // };

  // const ProtectedFarmerRoute = ({ children }) => {
  //   return user && user.role === 'farmer' ? children : <Navigate to="/" />;
  // };

  // const ProtectedConsumerRoute = ({ children }) => {
  //   return user && user.role === 'consumer' ? children : <Navigate to="/" />;
  // };

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



