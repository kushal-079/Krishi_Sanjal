import React from "react";
// import "./login.css";

const LoginForm = ({
  handleLogin,
  email,
  setEmail,
  password,
  setPassword,
  errorMessage,
}) => {
  return (
    <div>
      <header>
        <div className="header-container">
          <img src="/logo.jpeg" alt="Krishi Sanjal Logo" className="logo" />
          <h1>Krishi Sanjal</h1>
        </div>
      </header>

      <div className="form">
        <form onSubmit={handleLogin}>
          <h1>Login to Krishi Sanjal</h1>

          <div className="input-box">
            <div className="input-field">
              <input
                type="text"
                placeholder="Username or Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <i className="bx bxs-user"></i>
            </div>
          </div>

          <div className="input-box">
            <div className="input-field">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i className="bx bxs-lock-alt"></i>
            </div>
          </div>

          <button type="submit" className="btn">
            Login
          </button>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="form-footer">
            <a href="#" className="forgot-password">
              Forgot Password?
            </a>
            <p>
              Don't have an account?{" "}
              <a href="/signup" className="create-account">
                Create New Account
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
