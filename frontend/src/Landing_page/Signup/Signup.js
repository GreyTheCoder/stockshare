import React, { useState } from "react";

// Auth form: toggles between Login and Signup
function Signup() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Update form fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Form submit: send login/signup API request
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? "http://localhost:3002/login"
      : "http://localhost:3002/signup";

    try {
      const requestBody = isLogin
        ? { email: form.email, password: form.password }
        : {
            username: form.username,
            email: form.email,
            password: form.password,
          };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
        credentials: "include",
      });

      const data = await res.json();

      if (data.message) alert(data.message);

      if (
        (isLogin && data.message === "Login successful!") ||
        (!isLogin && data.message === "Signup successful!")
      ) {
        window.location.href = "http://localhost:3001";
      }
    } catch (err) {
      alert("Something went wrong!");
    }
  };

  // UI: Auth card with conditional fields and toggle
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow p-4"
        style={{ width: "350px", borderRadius: "10px" }}
      >
        <h3 className="text-center mb-4 text-primary fw-bold">
          {isLogin ? "Login" : "Signup"}
        </h3>

        <form onSubmit={handleSubmit}>
          {/* Username if in signup mode */}
          {!isLogin && (
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Enter username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-semibold">
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        {/* Toggle login/signup modes */}
        <div className="text-center mt-3">
          {isLogin ? (
            <>
              <span>Don’t have an account? </span>
              <button
                className="btn btn-link p-0 text-decoration-none"
                onClick={() => setIsLogin(false)}
              >
                Signup
              </button>
            </>
          ) : (
            <>
              <span>Already a user? </span>
              <button
                className="btn btn-link p-0 text-decoration-none"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;