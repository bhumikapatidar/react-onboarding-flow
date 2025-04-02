import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep } from "../../redux/onboardingSlice";
import { RootState } from "../../redux/store";

const OnboardingNavigation: React.FC = () => {
  const dispatch = useDispatch();
  const step = useSelector((state: RootState) => state.onboarding.step);

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      dispatch(nextStep());
    }
  };

  const handleBack = () => {
    if (step > 1) {
      dispatch(prevStep());
    }
  };

  return (
    <div className="navigation-buttons">
      {step > 1 && (
        <button className="back-btn" onClick={handleBack}>
          Back
        </button>
      )}
      {step < totalSteps ? (
        <button className="next-btn" onClick={handleNext}>
          Next
        </button>
      ) : (
        <button className="finish-btn" onClick={() => console.log("Finish")}>
          Finish
        </button>
      )}
    </div>
  );
};

export default OnboardingNavigation;
