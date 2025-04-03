import { Formik, Form, Field, ErrorMessage } from "formik";
import "../../styles/Onboarding.css";
import OnboardingNavigation from "./OnboardingNavigation";
import { usePersonalProfile } from "../../hooks/usePersonalProfile";

export const PersonalProfile = () => {
  const {
    personalInfo,
    profilePic,
    validationSchema,
    handleImageUpload,
    handleFieldChange,
    handleSubmit,
  } = usePersonalProfile();

  return (
    <div className="onboarding-container">
      <h2 className="onboarding-title">Personal Details</h2>
      <div className="onboarding-form-content">
        <Formik
          initialValues={personalInfo}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, isValid, handleSubmit, setFieldValue }) => (
            <Form className="form">
              <div className="input-group">
                <Field
                  name="name"
                  placeholder="Name *"
                  className="input-field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleFieldChange(
                      "name",
                      e.target.value,
                      setFieldValue,
                      values
                    )
                  }
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleFieldChange(
                      "age",
                      e.target.value,
                      setFieldValue,
                      values
                    )
                  }
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleFieldChange(
                      "email",
                      e.target.value,
                      setFieldValue,
                      values
                    )
                  }
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
                  onChange={handleImageUpload}
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
