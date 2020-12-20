import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";
import { GpaPage } from "./pages/GpaPage/GpaPage";
import { CoursePage } from "./pages/CoursePage/CoursePage";
import { AccountPage } from "./pages/AccountPage/AccountPage";
import { AboutPage } from "./pages/AboutPage/AboutPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signUp" component={SignUpPage} />
        <Route path="/gpa" component={GpaPage} />
        <Route path="/course/:id" component={CoursePage} />
        <Route path="/account" component={AccountPage} />
        <Route path="/about" component={AboutPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;
