import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { nextStep, setPersonalInfo } from "../../redux/onboardingSlice";
import "../../styles/Onboarding.css";
import OnboardingNavigation from "./OnboardingNavigation";

export const PersonalProfile = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    age: Yup.number()
      .required("Required")
      .positive("Age must be positive")
      .integer("Age must be an integer"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  return (
    <div className="onboarding-container">
      <h2 className="onboarding-title">Personal Details</h2>
      <div className="onboarding-form-content">
        <Formik
          initialValues={{ name: "", age: "", email: "", profilePicture: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(setPersonalInfo(values));
            dispatch(nextStep());
          }}
        >
          {({ isValid, dirty, handleSubmit }) => (
            <Form className="form">
              <div className="input-group">
                <Field
                  name="name"
                  placeholder="Name *"
                  className="input-field"
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
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-text"
                />
              </div>
              <OnboardingNavigation
                isNextDisabled={!(isValid && dirty)}
                onNext={handleSubmit}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
