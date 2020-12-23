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
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import store from "./redux/store";
import { Provider } from "react-redux";
import "./App.css";

import axios from "axios";
const host = require("./host");
axios.defaults.baseURL = host.server;

function PrivateRoute({ children, ...rest }) {
  // delete!!!
  const isUser = false;

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isUser ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        );
      }}
    />
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signUp" component={SignUpPage} />
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
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
