import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
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
import store from "./redux/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { checkAuth } from "./checkAuth";
import "./App.css";

import axios from "axios";
const host = require("./host");
axios.defaults.baseURL = host.server;

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return checkAuth() ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        );
      }}
    />
  );
}

function NonuserRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return checkAuth() ? <Redirect to={{ pathname: "/gpa" }} /> : children;
      }}
    />
  );
}

const persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <NonuserRoute path="/login">
              <LoginPage />
            </NonuserRoute>
            <NonuserRoute path="/signUp">
              <SignUpPage />
            </NonuserRoute>
            <PrivateRoute path="/gpa">
              <GpaPage />
            </PrivateRoute>
            <PrivateRoute path="/course/:id">
              <CoursePage />
            </PrivateRoute>
            <PrivateRoute path="/account">
              <AccountPage />
            </PrivateRoute>
            <Route path="/about" component={AboutPage} />
            <Route path="/announcements" component={AnnouncementPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
