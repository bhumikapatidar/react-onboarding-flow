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
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/store";
import { completeOnboarding } from "./redux/onboardingSlice";

const RoutesConfig = () => {
  const dispatch = useDispatch();
  const { isCompleted, step } = useSelector(
    (state: RootState) => state.onboarding
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/onboarding/*"
          element={
            isCompleted ? <Navigate to="/home" replace /> : <Onboarding />
          }
        />
        <Route
          path="/success"
          element={
            <SuccessPage onComplete={() => dispatch(completeOnboarding())} />
          }
        />
        <Route path="/home" element={<Home />} />
        <Route
          path="*"
          element={
            isCompleted ? <Navigate to="/home" replace /> : <Navigate to="/" />
          }
        />
      </Routes>
    </Router>
  );
};

export default RoutesConfig;
