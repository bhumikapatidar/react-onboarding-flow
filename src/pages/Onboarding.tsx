import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import "../styles/Onboarding.css";
import { PersonalProfile } from "../components/onboarding/PersonalProfile";
import { FavoriteSongs } from "../components/onboarding/FavoriteSongs";
import { PaymentInfo } from "../components/onboarding/PaymentInfo";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { completeOnboarding } from "../redux/onboardingSlice";

export const Onboarding = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { step, isCompleted } = useSelector(
    (state: RootState) => state.onboarding
  );

  useEffect(() => {
    if (isCompleted) {
      navigate("/home");
    }
  }, [isCompleted, navigate]);

  const handleComplete = () => {
    dispatch(completeOnboarding());
  };

  return (
    <div className="onboarding-container">
      <h1 className="title">Onboarding Flow</h1>
      <div className="onboarding-content">
        {step === 1 && <PersonalProfile />}
        {step === 2 && <FavoriteSongs />}
        {step === 3 && <PaymentInfo />}
      </div>
    </div>
  );
};
