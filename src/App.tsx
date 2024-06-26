import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./features/Dashboard/pages/Dashboard.tsx";
import Login from "./features/Auth/pages/Login.tsx";
import Layout from "./features/SharedComponents/Layout/Layout.tsx";
import RequireAuthRoutes from "./routes/RequireAuthRoutes.tsx";
import Signup from "./features/Auth/pages/Signup.tsx";
import ConfirmEmailPage from "./features/Auth/pages/ConfirmEmail.tsx";
import ForgotPassword from "./features/Auth/pages/ForgotPassword.tsx";
import ConfirmForgotPassword from "./features/Auth/pages/ConfirmForgotPassword.tsx";
import useAuth from "./features/Auth/hooks/useAuth.tsx";
import { useEffect, useState } from "react";
import MeditationsPage from "./features/Meditations/pages/MeditationsPage.tsx";
import DuermePage from "./features/Duerme/pages/DuermePage.tsx";
import SoundPage from "./features/Sounds/pages/SoundPage.tsx";
import NotificationsPage from "./features/Notifications/pages/NotificationsPage.tsx";
import UsersPage from "./features/Users/pages/UsersPage.tsx";

export const routesConfigPrivate = [
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
    isPrivate: true,
    roles: [],
  },
  { path: "/dashboard", element: <Dashboard />, isPrivate: true, roles: [] },
  {
    path: "/notifications",
    element: <NotificationsPage />,
    isPrivate: true,
    roles: [],
  },
  {
    path: "/meditacions",
    element: <MeditationsPage />,
    isPrivate: true,
    roles: [],
  },
  { path: "/duerme", element: <DuermePage />, isPrivate: true, roles: [] },
  { path: "/sounds", element: <SoundPage />, isPrivate: true, roles: [] },
  { path: "/users", element: <UsersPage />, isPrivate: true, roles: [] },
];

export const routesConfigPublic = [
  { path: "/", element: <Login />, isPrivate: true, roles: [] },
  { path: "/login", element: <Login />, isPrivate: false, roles: [] },
  { path: "/signUp", element: <Signup />, isPrivate: false, roles: [] },
  {
    path: "/account/confirm-email/:userId/:token",
    element: <ConfirmEmailPage />,
    isPrivate: false,
    roles: [],
  },
  {
    path: "/account/reset-password-verify/:userId/:token",
    element: <ConfirmForgotPassword />,
    isPrivate: false,
    roles: [],
  },
  {
    path: "/account/reset-password",
    element: <ForgotPassword />,
    isPrivate: false,
    roles: [],
  },
];

function App() {
  const { isAuth } = useAuth();
  const [routes, setRoutes] = useState(routesConfigPublic);

  useEffect(() => {
    setRoutes(isAuth ? routesConfigPrivate : routesConfigPublic);
  }, [isAuth]);

  return (
    <Routes>
      <Route element={<Layout />}>
        {routes.map((route, index) => {
          if (route.isPrivate) {
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <RequireAuthRoutes allowedRoles={route.roles}>
                    {route.element}
                  </RequireAuthRoutes>
                }
              />
            );
          }
          return (
            <Route key={index} path={route.path} element={route.element} />
          );
        })}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
