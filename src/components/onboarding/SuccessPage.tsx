import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Onboarding.css";

export const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("onboardingCompleted", "true");

    const timer = setTimeout(() => {
      navigate("/home", { replace: true });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="successContainer">
      <h1>🎉 Success!</h1>
      <p>You have successfully completed the onboarding process.</p>
      <p>Redirecting to the home page...</p>
    </div>
  );
};
