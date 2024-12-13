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
// import './Signup.css';

const SignupForm = ({ handleSubmit, formData, handleChange, error }) => {
  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h2 className="signup-form__title">Sign up for Krishi Sanjal</h2>

      <div className="signup-form__group">
        <label className="signup-form__label" htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          className="signup-form__input"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="signup-form__group">
        <label className="signup-form__label" htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          className="signup-form__input"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      <div className="signup-form__group">
        <label className="signup-form__label" htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="signup-form__input"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="signup-form__group">
        <label className="signup-form__label" htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          className="signup-form__input"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div className="signup-form__group">
        <label className="signup-form__label" htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className="signup-form__input"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="signup-form__group">
        <label className="signup-form__label" htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="signup-form__input"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

      <div className="signup-form__group">
        <label className="signup-form__label" htmlFor="role">Role</label>
        <select
          id="role"
          name="role"
          className="signup-form__select"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="consumer">Consumer</option>
          <option value="farmer">Farmer</option>
        </select>
      </div>

      {formData.role === 'farmer' && (
        <>
          <div className="signup-form__group">
            <label className="signup-form__label" htmlFor="registrationCode">Registration Code</label>
            <input
              type="text"
              id="registrationCode"
              name="registrationCode"
              className="signup-form__input"
              placeholder="Registration Code"
              value={formData.registrationCode}
              onChange={handleChange}
              required
            />
          </div>

          <div className="signup-form__group">
            <label className="signup-form__label" htmlFor="shopName">Shop Name</label>
            <input
              type="text"
              id="shopName"
              name="shopName"
              className="signup-form__input"
              placeholder="Shop Name"
              value={formData.shopName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="signup-form__group">
            <label className="signup-form__label" htmlFor="address1">Village or Town</label>
            <input
              type="text"
              id="address1"
              name="address1"
              className="signup-form__input"
              placeholder="Village or Town"
              value={formData.address1}
              onChange={handleChange}
              required
            />
          </div>

          <div className="signup-form__group">
            <label className="signup-form__label" htmlFor="address2">City</label>
            <input
              type="text"
              id="address2"
              name="address2"
              className="signup-form__input"
              placeholder="City"
              value={formData.address2}
              onChange={handleChange}
              required
            />
          </div>

          <div className="signup-form__group">
            <label className="signup-form__label" htmlFor="address3">State/Province</label>
            <input
              type="text"
              id="address3"
              name="address3"
              className="signup-form__input"
              placeholder="State/Province"
              value={formData.address3}
              onChange={handleChange}
              required
            />
          </div>
        </>
      )}

      {error && <p className="signup-form__error">{error}</p>}

      <button type="submit" className="signup-form__button">Sign Up</button>
    </form>
  );
};

export default SignupForm;
