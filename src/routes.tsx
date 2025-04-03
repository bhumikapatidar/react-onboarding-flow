import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Login } from "./pages/Login";
import { Onboarding } from "./pages/Onboarding";
import { Home } from "./pages/Home";
import { SuccessPage } from "./components/onboarding/SuccessPage";

const isOnboardingCompleted = () =>
  localStorage.getItem("onboardingCompleted") === "true";

const RoutesConfig = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/onboarding/*"
          element={
            isOnboardingCompleted() ? (
              <Navigate to="/home" replace />
            ) : (
              <Onboarding />
            )
          }
        />
        <Route
          path="/success"
          element={
            isOnboardingCompleted() ? (
              <Navigate to="/home" replace />
            ) : (
              <SuccessPage />
            )
          }
        />

        <Route path="/home" element={<Home />} />
        <Route
          path="*"
          element={
            isOnboardingCompleted() ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default RoutesConfig;
