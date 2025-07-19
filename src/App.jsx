import { BrowserRouter as Router, Routes, Route } from "react-router";
import RootPage from "./pages/root";
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import PasswordPage from './pages/password';
import ProfilePage from './pages/profile';
import IngredientPage from './pages/ingredients';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/reset-password" element={<PasswordPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/ingredients/:id" element={<IngredientPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
