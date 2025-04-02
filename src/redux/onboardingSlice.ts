import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OnboardingState {
  step: number;
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

const initialState: OnboardingState = {
  step: 1,
  personalInfo: { name: "", age: "", email: "", profilePicture: "" },
  favoriteSongs: [],
  paymentInfo: { cardNumber: "", expiryDate: "", cvv: "" },
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    setPersonalInfo: (
      state,
      action: PayloadAction<OnboardingState["personalInfo"]>
    ) => {
      state.personalInfo = action.payload;
    },
    setFavoriteSongs: (state, action: PayloadAction<string[]>) => {
      state.favoriteSongs = action.payload;
    },
    setPaymentInfo: (
      state,
      action: PayloadAction<OnboardingState["paymentInfo"]>
    ) => {
      state.paymentInfo = action.payload;
    },
    resetOnboarding: () => initialState,
  },
});

export const {
  nextStep,
  prevStep,
  setPersonalInfo,
  setFavoriteSongs,
  setPaymentInfo,
  resetOnboarding,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
