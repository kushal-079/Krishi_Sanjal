// import React from 'react';
// // import './signup.css';

// const SignupForm = ({ handleSubmit, formData, handleChange, error }) => {
//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Sign up for Krishi Sanjal</h2>

//       <input
//         type="text"
//         name="fullName"
//         placeholder="Full Name"
//         value={formData.fullName}
//         onChange={handleChange}
//         required
//       />
//       <input
//         type="text"
//         name="username"
//         placeholder="Username"
//         value={formData.username}
//         onChange={handleChange}
//         required
//       />
//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={handleChange}
//         required
//       />
//       <input
//         type="text"
//         name="phoneNumber"
//         placeholder="Phone number"
//         value={formData.phoneNumber}
//         onChange={handleChange}
//         required
//       />
//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={formData.password}
//         onChange={handleChange}
//         required
//       />
//       <input
//         type="password"
//         name="confirmPassword"
//         placeholder="Confirm Password"
//         value={formData.confirmPassword}
//         onChange={handleChange}
//         required
//       />

//       <select name="role" value={formData.role} onChange={handleChange}>
//         <option value="consumer">Consumer</option>
//         <option value="farmer">Farmer</option>
//       </select>

//       {formData.role === 'farmer' && (
//         <>
//           <input
//             type="text"
//             name="registrationCode"
//             placeholder="Registration Code"
//             value={formData.registrationCode}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="shopName"
//             placeholder="Shop Name"
//             value={formData.shopName}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="address"
//             placeholder="Address"
//             value={formData.address}
//             onChange={handleChange}
//             required
//           />
//         </>
//       )}

//       {error && <p>{error}</p>}

//       <button type="submit">Sign Up</button>
//     </form>
//   );
// };

// export default SignupForm;





import React from 'react';
import './signup.css';

const SignupForm = ({ handleSubmit, formData, handleChange, error }) => {
  return (
    <>
      {/* Header */}
      <header>
        <div className="header-container">
          <img src="/logo.png" alt="Logo" className="logo" />
          <h1>Krishi Sanjal</h1>
        </div>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit} className="form">
        <h2>Sign Up for Krishi Sanjal</h2>

        {/* Input Group */}
        <div className="input-group">
          <div className="input-field full-width">
            <i className="fas fa-user"></i>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <i className="fas fa-user-circle"></i>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <i className="fas fa-phone"></i>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Farmer Fields */}
        {formData.role === 'farmer' && (
          <div id="farmerFields">
            <div className="input-field">
              <i className="fas fa-id-card"></i>
              <input
                type="text"
                name="registrationCode"
                placeholder="Registration Code"
                value={formData.registrationCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        )}

        {error && <p className="form-error">{error}</p>}

        <button type="submit" className="btn">Sign Up</button>
      </form>
    </>
  );
};

export default SignupForm;
