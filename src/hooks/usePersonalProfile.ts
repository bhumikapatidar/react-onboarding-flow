import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, setPersonalInfo } from "../redux/onboardingSlice";
import { RootState } from "../redux/store";
import * as Yup from "yup";

export interface PersonalInfoFormValues {
  name: string;
  age: string;
  email: string;
  profilePicture: string;
}

export const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  age: Yup.number()
    .required("Required")
    .positive("Age must be positive")
    .integer("Age must be an integer"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export const usePersonalProfile = () => {
  const dispatch = useDispatch();
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const { personalInfo } = useSelector((state: RootState) => state.onboarding);

  useEffect(() => {
    if (personalInfo.profilePicture) {
      setProfilePic(personalInfo.profilePicture);
    }
  }, [personalInfo.profilePicture]);

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfilePic(base64String);
        saveFormData({ ...personalInfo, profilePicture: base64String });
      };
      reader.readAsDataURL(file);
    },
    [personalInfo]
  );

  const saveFormData = useCallback(
    (values: PersonalInfoFormValues) => {
      dispatch(
        setPersonalInfo({
          ...values,
          profilePicture: profilePic || values.profilePicture,
        })
      );
    },
    [dispatch, profilePic]
  );

  const handleSubmit = useCallback(
    (values: PersonalInfoFormValues) => {
      saveFormData(values);
      dispatch(nextStep());
    },
    [dispatch, saveFormData]
  );

  const handleFieldChange = useCallback(
    (
      fieldName: string,
      value: string,
      setFieldValue: (field: string, value: any) => void,
      values: PersonalInfoFormValues
    ) => {
      setFieldValue(fieldName, value);
      saveFormData({ ...values, [fieldName]: value });
    },
    [saveFormData]
  );

  return {
    personalInfo,
    profilePic,
    validationSchema,
    handleImageUpload,
    handleFieldChange,
    handleSubmit,
  };
};
