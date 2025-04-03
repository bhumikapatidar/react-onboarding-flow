import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, setPersonalInfo } from "../../redux/onboardingSlice";
import { RootState } from "../../redux/store";
import "../../styles/Onboarding.css";
import OnboardingNavigation from "./OnboardingNavigation";
import { useState, useEffect } from "react";

export const PersonalProfile = () => {
  const dispatch = useDispatch();
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const { personalInfo } = useSelector((state: RootState) => state.onboarding);

  useEffect(() => {
    if (personalInfo.profilePicture) {
      setProfilePic(personalInfo.profilePicture);
    }
  }, [personalInfo.profilePicture]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    age: Yup.number()
      .required("Required")
      .positive("Age must be positive")
      .integer("Age must be an integer"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfilePic(base64String);
        saveFormData({ ...personalInfo, profilePicture: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to save form data to Redux
  const saveFormData = (values: any) => {
    dispatch(
      setPersonalInfo({
        ...values,
        profilePicture: profilePic || values.profilePicture,
      })
    );
  };

  return (
    <div className="onboarding-container">
      <h2 className="onboarding-title">Personal Details</h2>
      <div className="onboarding-form-content">
        <Formik
          initialValues={personalInfo}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            saveFormData(values);
            dispatch(nextStep());
          }}
        >
          {({ values, isValid, handleSubmit, setFieldValue }) => (
            <Form className="form">
              <div className="input-group">
                <Field
                  name="name"
                  placeholder="Name *"
                  className="input-field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("name", e.target.value);
                    saveFormData({ ...values, name: e.target.value });
                  }}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error-text"
                />
              </div>

              <div className="input-group">
                <Field
                  name="age"
                  type="number"
                  placeholder="Age *"
                  className="input-field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("age", e.target.value);
                    saveFormData({ ...values, age: e.target.value });
                  }}
                />
                <ErrorMessage
                  name="age"
                  component="div"
                  className="error-text"
                />
              </div>

              <div className="input-group">
                <Field
                  name="email"
                  type="email"
                  placeholder="Email *"
                  className="input-field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("email", e.target.value);
                    saveFormData({ ...values, email: e.target.value });
                  }}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-text"
                />
              </div>
              <div className="profile-upload">
                <label htmlFor="profile-upload-input" className="upload-label">
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt="Profile"
                      className="profile-picture"
                    />
                  ) : (
                    <span className="upload-placeholder">
                      Upload Profile Picture *
                    </span>
                  )}
                </label>
                <input
                  type="file"
                  id="profile-upload-input"
                  accept="image/*"
                  onChange={(e) => {
                    handleImageUpload(e);
                    // We'll save the profile picture after it's converted to base64
                    // The saveFormData will be called in the reader.onloadend callback
                  }}
                  className="hidden-file-input"
                />
                <ErrorMessage
                  name="profilePicture"
                  component="div"
                  className="error-text"
                />
              </div>
              <OnboardingNavigation
                isNextDisabled={
                  !isValid ||
                  !values.name ||
                  !values.age ||
                  !values.email ||
                  !profilePic
                }
                onNext={handleSubmit}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
