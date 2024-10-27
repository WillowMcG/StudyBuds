import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import './App.css';
import Home from "./pages";
import Login from "./pages/login";
import Signup from "./pages/signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/sign-up"
          element={<Signup />}
        />
      </Routes>
    </Router>
  );
}

export default App;
