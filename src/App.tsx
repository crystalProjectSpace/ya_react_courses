import { Routes, Route, useLocation } from "react-router"
import RootPage from "./pages/root"
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import ResetPasswordPage from './pages/reset-password'
import ForgotPasswordPage from './pages/forgot-password'
import ProfilePage from './pages/profile/profile'
import { ErrorPage } from "./pages/error"
import { IngredientSinglePage } from "./pages/ingredient-single"
import { RouteGuard } from "./components/RouteGuard/RouteGuard"


function App() {
  const location = useLocation()
  const isRoot = location.state?.isRoot

  return (
      <Routes>
        <Route path="/login" element={
          <RouteGuard element={<LoginPage/>} isAnonymous={true} />
        } />
        <Route path="/register" element={
          <RouteGuard element={<RegisterPage/>} isAnonymous={true} />
        } />
        <Route path="/forgot-password" element={
          <RouteGuard element={<ForgotPasswordPage/>} isAnonymous={true} />
        } />
        <Route path="/reset-password" element={
          <RouteGuard element={<ResetPasswordPage/>} isAnonymous={true} />          
        } />
        <Route path="/" element={<RootPage/>} />

        <Route
          path="/profile"
          element={<RouteGuard element={<ProfilePage/>}/>}
        />
        <Route
          path="/ingredients/:id"
          element={
            <RouteGuard element={
              isRoot ? <RootPage/> : <IngredientSinglePage/>
            }/>
          }
        />

        <Route path="*" element={<ErrorPage/>} />
      </Routes>
  );
}

export default App;
