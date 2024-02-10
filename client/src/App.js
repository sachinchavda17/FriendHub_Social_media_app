import { BrowserRouter, Router, Route, Navigate } from "react-router-dom";
import HomePage from "./scenes/homePage/Home";
import LoginPage from "./scenes/loginPage/Login";
import ProfilePage from "./scenes/profilePage/Profile";
function App() {
  return (
    <BrowserRouter>
      <Router>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/profile/:userId" element={<ProfilePage />}></Route>
      </Router>
    </BrowserRouter>
  );
}

export default App;
