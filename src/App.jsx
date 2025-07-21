import { BrowserRouter as Router, Routes, Route } from "react-router"
import RootPage from "./pages/root"
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import ResetPasswordPage from './pages/reset-password'
import ForgotPasswordPage from './pages/forgot-password'
import ProfilePage from './pages/profile/profile'
import IngredientPage from './pages/ingredients'
import { RouteGuard } from "./components/RouteGuard/RouteGuard"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
        <Route path="/reset-password" element={<ResetPasswordPage/>} />

        <Route path="/" element={<RouteGuard element={<RootPage/>}/>} />
        <Route path="/profile" element={<RouteGuard element={<ProfilePage/>}/>} />
        <Route path="/ingredients/:id" element={<RouteGuard element={<IngredientPage/>}/>} />
      </Routes>
    </Router>
  );
}

export default App;
