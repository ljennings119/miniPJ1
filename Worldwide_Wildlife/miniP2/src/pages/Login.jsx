import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/css/createLogin.css";

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email (must include '@' and '.com').");
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser) {
      setError("No account found. Please create one first.");
      return;
    }

    if (savedUser.email === email && savedUser.password === password) {
      setIsLoggedIn(true);
      navigate("/cool-facts");
    } else {
      setError("Incorrect email or password.");
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
