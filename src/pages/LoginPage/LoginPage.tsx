import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../app/features/authSlice";
import { RootState } from "../../app/store";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const actionResult = await (dispatch as any)(login({ email, password }));
      const token = actionResult.payload.access_token;
      console.log("Login successful token: ", token);
      localStorage.setItem("token", token);
      navigate("/");
    } catch (err) {
      console.error("Failed to login:", err);
    }
  };

  return (
    <div className="login-page">
      <div className="con-wrapper">
        <div className="login-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <h2>Login</h2>
              <input
                className="input-field"
                placeholder="Username"
                type="text"
                value={email}
                onChange={(e) => setUsername(e.target.value)}
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
              <button className="btn login" type="submit" disabled={loading}>
                {loading ? "Loading..." : "Login"}
              </button>
              {error && <p className="error">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
