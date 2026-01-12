import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authActions";
import { reset } from "../../redux/slice/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { success, error, loading } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (success) {
      toast.success("Login Successful");
      navigate("/");
      dispatch(reset())
    }

    if (error) {
      toast.error(error);
      dispatch(reset())
    }
  }, [success, error, navigate]);

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "80vh" }}
    >
      <h1 className="mb-4">Admin Panel</h1>

      <form style={{ width: "300px" }} onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Logging in..." : "LOGIN"}
        </button>
      </form>
    </div>
  );
};

export default Login;
