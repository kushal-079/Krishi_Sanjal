import React from 'react';
// import './signup.css';

const SignupForm = ({ handleSubmit, formData, handleChange, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign up for Krishi Sanjal</h2>

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone number"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />

      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="consumer">Consumer</option>
        <option value="farmer">Farmer</option>
      </select>

      {formData.role === 'farmer' && (
        <>
          <input
            type="text"
            name="registrationCode"
            placeholder="Registration Code"
            value={formData.registrationCode}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="shopName"
            placeholder="Shop Name"
            value={formData.shopName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </>
      )}

      {error && <p>{error}</p>}

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
