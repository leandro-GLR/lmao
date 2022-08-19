import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="hold-transition register-page">
      <div className="register-box">
        <div className="card card-outline card-success">
          <div className="card-header text-center">
            <a href="../../index2.html" className="h1">
              <b>GLR</b>
            </a>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Register a new user</p>
            <form action="../../index.html" method="post">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full name"
                  name="user"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Retype password"
                  name="repeatedPassword"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="terms"
                      defaultValue="agree"
                    />
                    <label htmlFor="agreeTerms">
                      I agree to the <a href="#">terms</a>
                    </label>
                  </div>
                </div>
                {/* /.col */}
                <div className="col-4">
                  <button type="submit" className="btn btn-success btn-block">
                    Register
                  </button>
                </div>
                {/* /.col */}
              </div>
            </form>
            <div className="social-auth-links text-center">
              <a href="#" className="btn btn-block btn-primary">
                <i className="fab fa-facebook mr-2" />
                Sign up using Facebook
              </a>
              <a href="#" className="btn btn-block btn-danger">
                <i className="fab fa-google-plus mr-2" />
                Sign up using Google+
              </a>
            </div>
            <a href="login.html" className="text-center">
              I already have an account
            </a>
          </div>
          {/* /.form-box */}
        </div>
        {/* /.card */}
      </div>
      {/* /.register-box */}
    </div>
  );
}
