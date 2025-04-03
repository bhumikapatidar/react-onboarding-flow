import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PersonalInfo {
  name: string;
  age: string;
  email: string;
  profilePicture: string;
}

interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface OnboardingState {
  step: number;
  isCompleted: boolean;
  personalInfo: PersonalInfo;
  favoriteSongs: string[];
  paymentInfo: PaymentInfo;
}

const STORAGE_KEYS = {
  ONBOARDING_STATE: "onboardingState",
  ONBOARDING_COMPLETED: "onboardingCompleted",
};

const defaultState: OnboardingState = {
  step: 1,
  isCompleted: false,
  personalInfo: { name: "", age: "", email: "", profilePicture: "" },
  favoriteSongs: [],
  paymentInfo: { cardNumber: "", expiryDate: "", cvv: "" },
};

const loadState = (): OnboardingState => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEYS.ONBOARDING_STATE);
    if (serializedState === null) {
      return defaultState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading onboarding state from localStorage:", err);
    return defaultState;
  }
};

const saveStateToLocalStorage = (state: OnboardingState): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_STATE, JSON.stringify(state));
  } catch (err) {
    console.error("Error saving onboarding state to localStorage:", err);
  }
};

const initialState: OnboardingState = loadState();

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
      saveStateToLocalStorage(state);
    },
    prevStep: (state) => {
      state.step -= 1;
      saveStateToLocalStorage(state);
    },
    setPersonalInfo: (state, action: PayloadAction<PersonalInfo>) => {
      state.personalInfo = action.payload;
      saveStateToLocalStorage(state);
    },
    setFavoriteSongs: (state, action: PayloadAction<string[]>) => {
      state.favoriteSongs = action.payload;
      saveStateToLocalStorage(state);
    },
    setPaymentInfo: (state, action: PayloadAction<PaymentInfo>) => {
      state.paymentInfo = action.payload;
      saveStateToLocalStorage(state);
    },
    completeOnboarding: (state) => {
      state.isCompleted = true;
      localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, "true");
      saveStateToLocalStorage(state);
    },
    resetOnboarding: () => {
      localStorage.removeItem(STORAGE_KEYS.ONBOARDING_STATE);
      localStorage.removeItem(STORAGE_KEYS.ONBOARDING_COMPLETED);
      return defaultState;
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
