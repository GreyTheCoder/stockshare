import React, { useState } from "react";

function Signup() {
  // Step 1: Manage toggle + form state
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  // ✅ Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log("Updated form:", { ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? "http://localhost:3002/login"
      : "http://localhost:3002/signup";

    try {
      // ✅ Step 1: Prepare correct body
       const requestBody = isLogin
  ? { email: form.email, password: form.password } // Changed here
  : { username: form.username, email: form.email, password: form.password };

      console.log("🔹 Sending request to:", url);
      console.log("🔹 Request body:", requestBody);

      // ✅ Step 2: Send request
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
        credentials: "include", // 🔑 needed for session cookies
      });

      const data = await res.json();
      console.log("🔹 Response:", data);

      // ✅ Step 3: Alert + redirect
      if (data.message) alert(data.message);

      if (
        (isLogin && data.message === "Login successful!") ||
        (!isLogin && data.message === "Signup successful!")
      ) {
        console.log("✅ Redirecting to dashboard...");
        window.location.href = "http://localhost:3001";
      }
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Something went wrong!");
    }
  };

  // ✅ UI
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
          {/* Username Field (always visible) */}
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

          {/* Email Field (only visible during signup) */}
          {!isLogin && (
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
          )}

          {/* Password Field */}
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

        {/* Toggle between login/signup */}
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
