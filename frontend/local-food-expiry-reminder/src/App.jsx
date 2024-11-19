import "preline/preline";
import LandingPage from "./components/LandingPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={isAuthenticated() ? <Navigate to="/home" /> : <Login />} />
        <Route path="/signup" element={isAuthenticated() ? <Navigate to="/home" /> : <Signup />} />

        <Route
          path="/home"
          element={isAuthenticated() ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
