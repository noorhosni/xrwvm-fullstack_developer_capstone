import React, { useState } from "react";
import "./Register.css";
import user_icon from "../assets/person.png"
import email_icon from "../assets/email.png"
import password_icon from "../assets/password.png"
import close_icon from "../assets/close.png"

const Register = () => {
  // State variables for form inputs
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Redirect to home
  const gohome = () => {
    window.location.href = window.location.origin;
  }

  // Handle form submission
  const register = async (e) => {
    e.preventDefault();
    let register_url = window.location.origin + "/djangoapp/register";

    // Send POST request to register endpoint
    const res = await fetch(register_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "userName": userName,
        "password": password,
        "firstName": firstName,
        "lastName": lastName,
        "email": email
      }),
    });

    const json = await res.json();
    if (json.status === "Authenticated") {
      // Save username in session and reload home
      sessionStorage.setItem('username', json.userName);
      window.location.href = window.location.origin;
      window.location.reload();
    } else if (json.error === "Already Registered") {
      alert("The user with same username is already registered");
    } else {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card register-card">
            <div className="card-header text-center">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="mb-0 text-primary">Create Account</h3>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={gohome}
                  aria-label="Close"
                ></button>
              </div>
            </div>
            
            <div className="card-body">
              <form onSubmit={register}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-user"></i>
                    </span>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="firstName"
                      placeholder="Enter your first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-user"></i>
                    </span>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="lastName"
                      placeholder="Enter your last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-envelope"></i>
                    </span>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="userName" className="form-label">Username</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-at"></i>
                    </span>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="userName"
                      placeholder="Choose a username"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-lock"></i>
                    </span>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-100 btn-lg">
                  <i className="fas fa-user-plus me-2"></i>
                  Create Account
                </button>
              </form>

              <div className="text-center mt-3">
                <p className="text-muted">
                  Already have an account? <a href="/login" className="text-primary">Sign in here</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;