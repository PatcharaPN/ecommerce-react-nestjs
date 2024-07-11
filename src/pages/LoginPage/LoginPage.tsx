import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../app/features/authSlice";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
  const [switchForm, setswitchForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (switchForm) {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      try {
        const actionResult = await (dispatch as any)(
          register({ email, password })
        );
        const token = actionResult.payload.accessToken;
        console.log("Register successful token: ", token);
        localStorage.setItem("token", token);
        navigate("/");
      } catch (err) {
        console.error("Failed to register:", err);
      }
    } else {
      try {
        const actionResult = await (dispatch as any)(
          login({ email, password })
        );
        const token = actionResult.payload.accessToken;
        console.log("Login successful token: ", token);
        localStorage.setItem("token", token);
        navigate("/");
      } catch (err) {
        console.error("Failed to login:", err);
      }
    }
  };

  const handleSwitch = () => {
    setswitchForm(!switchForm);
  };

  return (
    <div className="login-page">
      <div className="con-wrapper">
        <div
          className={`form-container ${
            switchForm ? "register-mode" : "login-mode"
          }`}
        >
          <div className="login-container">
            <form onSubmit={handleSubmit}>
              {switchForm ? (
                <div className="form-group">
                  <h2>Register</h2>
                  <input
                    className="input-field"
                    placeholder="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    className="input-field"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <input
                    className="input-field"
                    placeholder="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />

                  <button className="btn" type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Register"}
                  </button>
                </div>
              ) : (
                <div className="form-group">
                  <h2>Login</h2>
                  <input
                    className="input-field"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    className="input-field"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button className="btn" type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Login"}
                  </button>
                </div>
              )}
              {error && <p className="error">{error}</p>}
            </form>
            <div className="switch-text">
              <p>
                {switchForm
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </p>
              <button
                className="btn-switch"
                type="button"
                onClick={handleSwitch}
              >
                {switchForm ? "Login" : "Register"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
