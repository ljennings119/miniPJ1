import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/createLogin.css";

export default function CreateLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

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

    if (!validateEmail(email)) {
      setError("Please enter a valid email (must include '@' and '.com').");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Save user in localStorage (simple simulation)
    const user = { email, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Account created successfully!");
    navigate("/login");
  };

  return (
    <form className="container" onSubmit={handleSubmit} style={{ marginTop: "100px" }}>
      <h1>Sign Up</h1>
      <p>Please fill in this form to create an account.</p>
      <hr />

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

      <label>Repeat Password</label>
      <input
        type="password"
        placeholder="Repeat Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      <p>
        Password must include at least 8 characters, one uppercase, one lowercase,
        one number, and one special character.
      </p>

      <div className="clearfix">
        <button type="button" className="cancelbtn" onClick={() => navigate("/")}>
          Cancel
        </button>
        <button type="submit" className="signupbtn">
          Sign Up
        </button>
      </div>
    </form>
  );
}
