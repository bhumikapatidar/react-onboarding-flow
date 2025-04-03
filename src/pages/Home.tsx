import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import "../styles/Home.css";

export const Home = () => {
  const userName = useSelector(
    (state: RootState) => state.onboarding.personalInfo.name
  );

  return (
    <div className="home-container">
      <div className="welcome-card">
        <h1 className="welcome-title">🎉 Welcome, {userName || "Guest"}! 🎉</h1>
        <p className="welcome-text">
          We’re thrilled to have you here! 🚀 Get ready to explore amazing
          features and make the most out of your journey with us.
        </p>
        <button className="explore-btn">Start Exploring</button>
      </div>
    </div>
  );
};
