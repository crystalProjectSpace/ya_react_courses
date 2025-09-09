import { useEffect } from "react"
import { UnknownAction } from "redux"
import { Routes, Route, useLocation } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import RootPage from "./pages/root"
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import ResetPasswordPage from './pages/reset-password'
import ForgotPasswordPage from './pages/forgot-password'
import ProfilePage from './pages/profile/profile'
import { ErrorPage } from "./pages/error"
import { IngredientSinglePage } from "./pages/ingredient-single"
import { RouteGuard } from "./components/RouteGuard/RouteGuard"
import { FeedList } from "./pages/feed-list/feed-list"
import { FeedItem } from './pages/feed-item/feed-item'
import { Orders } from "./pages/orders/orders"
import type { IIngredientState } from "./types"
import { getItems } from "./services"
import { API_URL } from "./constants"

function App() {
  const location = useLocation()
  const isRoot = location.state?.isRoot
  const dispatch = useDispatch()

  const hasLoadedIngredients = useSelector((state: IIngredientState) => state.availableItems.items.length > 0)

  useEffect(() => {
    if (!hasLoadedIngredients) dispatch(getItems(API_URL) as unknown as UnknownAction)
  }, [])

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
          path="/profile/orders"
          element={<RouteGuard element={<Orders/>}/>}
        />

        <Route
          path="/profile/orders/:number"
          element={<RouteGuard element={ isRoot ? <Orders/> : <FeedItem/> }/>}
        />        

        <Route path="/feed" element={<FeedList/>} />

        <Route path="/feed/:number" element= {isRoot ? <FeedList/> : <FeedItem/>} />

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
