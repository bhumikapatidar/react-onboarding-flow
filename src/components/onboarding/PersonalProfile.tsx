import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { nextStep, setPersonalInfo } from "../../redux/onboardingSlice";
import "../../styles/Onboarding.css";

export const PersonalProfile = () => {
  const dispatch = useDispatch();
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  return (
    <div className="onboarding-container">
      <h2 className="onboarding-title">Personal Details</h2>
      <div className="onboarding-content">
        <Formik
          initialValues={{ name: "", age: "", email: "", profilePicture: "" }}
          validationSchema={Yup.object({
            name: Yup.string().required("Required"),
            age: Yup.number().required("Required").positive().integer(),
            email: Yup.string().email("Invalid email").required("Required"),
          })}
          onSubmit={(values) => {
            dispatch(
              setPersonalInfo({ ...values, profilePicture: profilePic ?? "" })
            );
            dispatch(nextStep());
          }}
        >
          {({ errors, touched }) => (
            <Form className="form">
              <div className="input-group">
                <Field name="name" placeholder="Name" className="input-field" />
                {errors.name && touched.name && (
                  <p className="error-text">{errors.name}</p>
                )}
              </div>

              <div className="input-group">
                <Field
                  name="age"
                  type="number"
                  placeholder="Age"
                  className="input-field"
                />
                {errors.age && touched.age && (
                  <p className="error-text">{errors.age}</p>
                )}
              </div>

              <div className="input-group">
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="input-field"
                />
                {errors.email && touched.email && (
                  <p className="error-text">{errors.email}</p>
                )}
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
                      Upload Profile Picture
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
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
