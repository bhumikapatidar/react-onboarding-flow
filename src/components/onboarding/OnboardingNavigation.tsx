import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { prevStep, completeOnboarding } from "../../redux/onboardingSlice";
import { RootState } from "../../redux/store";

interface OnboardingNavigationProps {
  isNextDisabled: boolean;
  onNext: () => void;
}

const TOTAL_STEPS = 4;

const OnboardingNavigation: React.FC<OnboardingNavigationProps> = ({
  isNextDisabled,
  onNext,
}) => {
  const dispatch = useDispatch();
  const step = useSelector((state: RootState) => state.onboarding.step);

  const handleBack = useCallback(() => {
    if (step > 1) {
      dispatch(prevStep());
    }
  }, [dispatch, step]);

  const handleFinish = useCallback(() => {
    dispatch(completeOnboarding());
  }, [dispatch]);

  return (
    <div className="navigation-buttons">
      {step > 1 && (
        <button
          className="back-btn"
          onClick={handleBack}
          aria-label="Previous step"
        >
          Back
        </button>
      )}
      {step < TOTAL_STEPS ? (
        <button
          className="next-btn"
          onClick={onNext}
          disabled={isNextDisabled}
          aria-label="Next step"
        >
          Next
        </button>
      ) : (
        <button
          className="finish-btn"
          onClick={handleFinish}
          aria-label="Complete onboarding"
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default OnboardingNavigation;
