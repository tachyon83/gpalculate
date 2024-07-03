import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";
import { GpaPage } from "./pages/GpaPage/GpaPage";
import { CoursePage } from "./pages/CoursePage/CoursePage";
import { AccountPage } from "./pages/AccountPage/AccountPage";
import { AboutPage } from "./pages/AboutPage/AboutPage";
import { AnnouncementPage } from "./pages/AnnouncementPage/AnnouncementPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import store from "./redux/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { checkAuth, checkAdmin } from "./checkAuth";
import "./App.css";

import axios from "axios";
const host = require("./host");
axios.defaults.baseURL = host.server;

function PrivateRoute({ children }) {
  return checkAdmin() ? (
    <Navigate to="/admin" />
  ) : checkAuth() ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}

function NonuserRoute({ children }) {
  return checkAuth() ? <Navigate to="/gpa" /> : children;
}

function AdminRoute({ children }) {
  return checkAdmin() ? (
    children
  ) : checkAuth() ? (
    <Navigate to="/gpa" />
  ) : (
    <Navigate to="/login" />
  );
}

const persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route
              path="/login"
              element={
                <NonuserRoute>
                  <LoginPage />
                </NonuserRoute>
              }
            />
            <Route
              path="/signUp"
              element={
                <NonuserRoute>
                  <SignUpPage />
                </NonuserRoute>
              }
            />
            <Route
              path="/gpa"
              element={
                <PrivateRoute>
                  <GpaPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/course/:id"
              element={
                <PrivateRoute>
                  <CoursePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/account"
              element={
                <PrivateRoute>
                  <AccountPage />
                </PrivateRoute>
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/announcements" element={<AnnouncementPage />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminPage />
                </AdminRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
