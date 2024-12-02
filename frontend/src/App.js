import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import './App.css';
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Main from "./pages/main";
import Questions from "./pages/questions"
import Leaderboard from "./pages/leaderboard"

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/main" element={<Main />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
