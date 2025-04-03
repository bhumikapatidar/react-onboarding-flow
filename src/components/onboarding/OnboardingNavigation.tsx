import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { prevStep } from "../../redux/onboardingSlice";
import { RootState } from "../../redux/store";

interface OnboardingNavigationProps {
  isNextDisabled: boolean;
  onNext: () => void;
}

const OnboardingNavigation: React.FC<OnboardingNavigationProps> = ({
  isNextDisabled,
  onNext,
}) => {
  const dispatch = useDispatch();
  const step = useSelector((state: RootState) => state.onboarding.step);

  const totalSteps = 4;

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
        <button className="next-btn" onClick={onNext} disabled={isNextDisabled}>
          Next
        </button>
      ) : (
        <button className="finish-btn" onClick={() => console.log("Finish")}>
          Submit
        </button>
      )}
    </div>
  );
};

export default OnboardingNavigation;
