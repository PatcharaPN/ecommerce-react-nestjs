import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../app/features/authSlice";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { motion } from "framer-motion";

const LoginPage: React.FC = () => {
  const [switchForm, setswitchForm] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null);

  const handleCheckboxChange = (userType: string) => {
    setSelectedUserType((prevUserType) =>
      prevUserType === userType ? null : userType
    );
    setFormValues((prevValues) => ({
      ...prevValues,
      role: userType,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (switchForm) {
      if (formValues.password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      try {
        const { username, email, password, role } = formValues;
        const actionResult = await dispatch(
          register({ username, email, password, role }) as any
        );

        if (register.fulfilled.match(actionResult)) {
          console.log("Registration successful:", actionResult.payload);
          window.location.reload();
        } else {
          console.error("Failed to register:", actionResult.error.message);
        }
      } catch (err) {
        console.error("Failed to register:", err);
      }
    } else {
      try {
        const { email, password } = formValues;
        const actionResult = await dispatch(login({ email, password }) as any);
        if (login.fulfilled.match(actionResult)) {
          console.log("Login successful:", actionResult.payload);
          navigate("/");
        } else {
          console.error("Failed to login:", actionResult.error.message);
        }
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
                    value={formValues.email}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                  <input
                    className="input-field"
                    placeholder="username"
                    type="text"
                    value={formValues.username}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        username: e.target.value,
                      })
                    }
                    required
                  />
                  <input
                    className="input-field"
                    placeholder="Password"
                    type="password"
                    value={formValues.password}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        password: e.target.value,
                      })
                    }
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
                  <label className="user-type">
                    <div className="checkbox-form">
                      <input
                        type="checkbox"
                        name="customer"
                        checked={selectedUserType === "customer"}
                        onChange={() => handleCheckboxChange("customer")}
                      />
                      Customer
                    </div>
                    <div className="checkbox-form">
                      <input
                        type="checkbox"
                        name="merchant"
                        checked={selectedUserType === "merchant"}
                        onChange={() => handleCheckboxChange("merchant")}
                      />
                      Merchant
                    </div>
                  </label>
                  <button
                    className="register-btn "
                    type="submit"
                    disabled={loading}
                  >
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
                    value={formValues.email}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                  <input
                    className="input-field"
                    placeholder="Password"
                    type="password"
                    value={formValues.password}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        password: e.target.value,
                      })
                    }
                    required
                  />
                  <motion.button
                    whileTap={{ scale: 0.9, color: "red" }}
                    whileHover={{ scale: 1.1, backgroundColor: "black" }}
                    className="login-btn"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Login"}
                  </motion.button>
                </div>
              )}
              {error && <p className="error">{error}</p>}
            </form>

            <div className="switch-text-warper">
              <p className="switch-text">
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
