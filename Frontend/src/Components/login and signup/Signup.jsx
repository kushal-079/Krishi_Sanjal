import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from './SignupForm';

const Signup = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    role: 'consumer',
    registrationCode: '',
    shopName: '',
    address: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (response.ok) {
        if (result.user) {
          onLogin(result.user);
          if (result.user.role === 'farmer') {
            navigate('/farmer');
          } else if (result.user.role === 'consumer') {
            navigate('/consumer');
          }
          else {
            navigate('/signup');
          }
        } else {
          setError('User data not found in the response.');
        }
      } else {
        setError(result.message || 'Signup failed!');
      }
    } catch (err) {
      setError('Server error, please try again later.');
    }
  };

  return (
    <div>
      <SignUpForm
        handleSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        error={error}
      />
    </div>
  );
};

export default Signup;
