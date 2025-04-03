import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Onboarding.css";
import { useDispatch } from "react-redux";
import { completeOnboarding } from "../../redux/onboardingSlice";

interface SuccessPageProps {
  onComplete: () => void;
}

export const SuccessPage = ({ onComplete }: SuccessPageProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    onComplete();
    dispatch(completeOnboarding());
    const timer = setTimeout(() => {
      navigate("/home", { replace: true });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, onComplete, dispatch]);

  return (
    <div className="successContainer">
      <h1>🎉 Success!</h1>
      <p>You have successfully completed the onboarding process.</p>
      <p>Redirecting to the home page...</p>
    </div>
  );
};
