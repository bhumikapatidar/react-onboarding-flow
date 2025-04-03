import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import "../styles/Onboarding.css";
import { PersonalProfile } from "../components/onboarding/PersonalProfile";
import { FavoriteSongs } from "../components/onboarding/FavoriteSongs";
import { PaymentInfo } from "../components/onboarding/PaymentInfo";
import { SuccessPage } from "../components/onboarding/SuccessPage";

export const Onboarding = () => {
  const step = useSelector((state: RootState) => state.onboarding.step);

  return (
    <div className="onboarding-container">
      <h1 className="title">Onboarding Flow</h1>
      <div className="onboarding-content">
        {step === 1 && <PersonalProfile />}
        {step === 2 && <FavoriteSongs />}
        {step === 3 && <PaymentInfo />}
        {step === 4 && <SuccessPage />}
      </div>
    </div>
  );
};

export default Onboarding;
