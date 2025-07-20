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
        <Route
          path="/login"
          element={<RouteGuard element={<LoginPage/>} allowAuthorized={false}/>}
        />

        <Route
          path="/register"
          element={<RegisterPage/>}
        />

        <Route
          path="/forgot-password"
          element={<RouteGuard element={<ForgotPasswordPage/>} allowAuthorized={false}/>}
        />

        <Route
          path="/reset-password"
          element={<RouteGuard element={<ResetPasswordPage/>} allowAuthorized={false}/>}
        />

        <Route
          path="/"
          element={<RouteGuard element={<RootPage/>} allowAuthorized={true}/>}
        />

        <Route
          path="/profile"
          element={<RouteGuard element={<ProfilePage/>} allowAuthorized={true}/>}
        />

        <Route
          path="/ingredients/:id"
          element={<RouteGuard element={<IngredientPage/>} allowAuthorized={true}/>}
        />
      </Routes>
    </Router>
  );
}

export default App;
