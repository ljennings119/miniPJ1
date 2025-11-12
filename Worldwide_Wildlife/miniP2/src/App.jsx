import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./App.css";
import "./assets/css/font-awesome.min.css";
import "./assets/css/createLogin.css";
import "./assets/css/main.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Axolotls from "./pages/Axolotls";
import Platypus from "./pages/Platypus";
import BlackPanther from "./pages/BlackPanther";
import SecretaryBird from "./pages/SecretaryBird";
import CreateLogin from "./pages/CreateLogin";
import CoolFacts from "./pages/CoolFacts";
import ProtectedRoute from "./ProtectedRoute";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import Login from "./pages/Login";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/axolotls" element={<Axolotls />} />
        <Route path="/platypus" element={<Platypus />} />
        <Route path="/blackpanther" element={<BlackPanther />} />
        <Route path="/secretarybird" element={<SecretaryBird />} />
        <Route path="/create-login" element={<CreateLogin />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        {/* Protected Route Example */}
        <Route
          path="/cool-facts"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <CoolFacts />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer isLoggedIn={isLoggedIn} />
      <div className="copyright">Worldwide Wildlife Est. 2025</div>
    </Router>
  );
}

export default App;

