import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/css/createLogin.css";

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const MAX_ATTEMPTS = 3;
  const LOCKOUT_TIME = 60 * 1000; // 1 minute lockout

  // 🔹 Email Validator
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 🔹 Password Validator — SAME as CreateLogin.jsx
  const validatePassword = (password) => {
    return (
      /[A-Z]/.test(password) && // uppercase
      /[a-z]/.test(password) && // lowercase
      /\d/.test(password) && // number
      /[!@#$%^&*(),.?":{}|<>]/.test(password) && // special character
      password.length >= 8
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // 🔒Check lockout
    const lockout = localStorage.getItem("lockoutTime");
    if (lockout) {
      const lockoutEnd = parseInt(lockout);

      if (Date.now() < lockoutEnd) {
        const secondsLeft = Math.ceil((lockoutEnd - Date.now()) / 1000);
        setError(
          `Too many attempts. Try again in ${secondsLeft} seconds.`
        );
        return;
      } else {
        // Reset after lockout expires
        localStorage.removeItem("lockoutTime");
        localStorage.removeItem("loginAttempts");
      }
    }

    // ❗ Validate email
    if (!validateEmail(email)) {
      setError("Please enter a valid email (must include '@' and '.com').");
      return;
    }

    // ❗ Validate password strength
    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser) {
      setError("No account found. Please create one first.");
      return;
    }

    // SUCCESS — credentials match
    if (savedUser.email === email && savedUser.password === password) {
      localStorage.removeItem("loginAttempts");
      localStorage.removeItem("lockoutTime");

      setIsLoggedIn(true);
      navigate("/cool-facts");
    } else {
      // FAILED attempt
      let attempts =
        parseInt(localStorage.getItem("loginAttempts")) || 0;
      attempts++;
      localStorage.setItem("loginAttempts", attempts);

      if (attempts >= MAX_ATTEMPTS) {
        const lockoutEnd = Date.now() + LOCKOUT_TIME;
        localStorage.setItem("lockoutTime", lockoutEnd);
        setError(
          `Too many failed attempts. You are locked out for ${
            LOCKOUT_TIME / 1000
          } seconds.`
        );
      } else {
        setError(
          `Incorrect email or password. Attempts left: ${
            MAX_ATTEMPTS - attempts
          }`
        );
      }
    }
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {error && (
          <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
        )}

        <label>Email</label>
        <input
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="signupbtn">Login</button>
      </form>

      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        Don’t have an account?{" "}
        <Link
          to="/create-login"
          style={{ color: "#53c1fc", textDecoration: "underline" }}
        >
          Create an Account
        </Link>
      </p>
    </div>
  );
}
