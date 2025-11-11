import { Link } from "react-router-dom";

export default function ModalLogin({ show, onClose, onLogin }) {
  if (!show) return null;

  return (
    <div
      className="modal"
      style={{
        display: "block",
        backgroundColor: "rgba(0,0,0,0.7)",
        position: "fixed",
        inset: 0,
        zIndex: 9999,
      }}
    >
      <div
        className="modal-content"
        style={{
          background: "#fff",
          margin: "10% auto",
          padding: "2rem",
          width: "90%",
          maxWidth: "400px",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <span
          className="close"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "15px",
            right: "25px",
            fontSize: "28px",
            cursor: "pointer",
          }}
        >
          &times;
        </span>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Enter Email"
          style={{ width: "100%", margin: "10px 0", padding: "10px" }}
        />
        <input
          type="password"
          placeholder="Enter Password"
          style={{ width: "100%", margin: "10px 0", padding: "10px" }}
        />
        <button
          onClick={onLogin}
          style={{
            backgroundColor: "#53c1fc",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Login
        </button>

        {/* ✅ Create Account link in modal */}
        <p style={{ marginTop: "1rem" }}>
          Don’t have an account?{" "}
          <Link
            to="/create-login"
            onClick={onClose} // closes modal when user clicks
            style={{ color: "#53c1fc", textDecoration: "underline" }}
          >
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
}
