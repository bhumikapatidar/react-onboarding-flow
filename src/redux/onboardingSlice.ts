import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OnboardingState {
  step: number;
  isCompleted: boolean;
  personalInfo: {
    name: string;
    age: string;
    email: string;
    profilePicture: string;
  };
  favoriteSongs: string[];
  paymentInfo: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
}

const loadState = (): OnboardingState => {
  try {
    const serializedState = localStorage.getItem("onboardingState");
    if (serializedState === null) {
      return {
        step: 1,
        isCompleted: false,
        personalInfo: { name: "", age: "", email: "", profilePicture: "" },
        favoriteSongs: [],
        paymentInfo: { cardNumber: "", expiryDate: "", cvv: "" },
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      step: 1,
      isCompleted: false,
      personalInfo: { name: "", age: "", email: "", profilePicture: "" },
      favoriteSongs: [],
      paymentInfo: { cardNumber: "", expiryDate: "", cvv: "" },
    };
  }
};

const initialState: OnboardingState = loadState();

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
      localStorage.setItem("onboardingState", JSON.stringify(state));
    },
    prevStep: (state) => {
      state.step -= 1;
      localStorage.setItem("onboardingState", JSON.stringify(state));
    },
    setPersonalInfo: (
      state,
      action: PayloadAction<OnboardingState["personalInfo"]>
    ) => {
      state.personalInfo = action.payload;
      localStorage.setItem("onboardingState", JSON.stringify(state));
    },
    setFavoriteSongs: (state, action: PayloadAction<string[]>) => {
      state.favoriteSongs = action.payload;
      localStorage.setItem("onboardingState", JSON.stringify(state));
    },
    setPaymentInfo: (
      state,
      action: PayloadAction<OnboardingState["paymentInfo"]>
    ) => {
      state.paymentInfo = action.payload;
      localStorage.setItem("onboardingState", JSON.stringify(state));
    },
    completeOnboarding: (state) => {
      state.isCompleted = true;
      localStorage.setItem("onboardingCompleted", "true");
      localStorage.setItem("onboardingState", JSON.stringify(state));
    },
    resetOnboarding: () => {
      localStorage.removeItem("onboardingState");
      localStorage.removeItem("onboardingCompleted");
      return {
        step: 1,
        isCompleted: false,
        personalInfo: { name: "", age: "", email: "", profilePicture: "" },
        favoriteSongs: [],
        paymentInfo: { cardNumber: "", expiryDate: "", cvv: "" },
      };
    },
  },
});

export const {
  nextStep,
  prevStep,
  setPersonalInfo,
  setFavoriteSongs,
  setPaymentInfo,
  completeOnboarding,
  resetOnboarding,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
