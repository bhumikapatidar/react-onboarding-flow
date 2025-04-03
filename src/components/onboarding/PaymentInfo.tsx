import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { nextStep, setPaymentInfo } from "../../redux/onboardingSlice";
import "../../styles/Onboarding.css";
import OnboardingNavigation from "./OnboardingNavigation";

export const PaymentInfo = () => {
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    cardNumber: Yup.string()
      .matches(/^\d{16}$/, "Card number must be exactly 16 digits")
      .required("Required"),
    expiryDate: Yup.string()
      .matches(
        /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
        "Expiry date must be in MM/YY format"
      )
      .test("valid-date", "Card is expired", function (value) {
        if (!value) return false;

        const [month, year] = value.split("/").map(Number);
        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;

        if (year < currentYear) return false;
        if (year === currentYear && month < currentMonth) return false;
        return true;
      })
      .required("Required"),
    cvv: Yup.string()
      .matches(/^\d{3}$/, "CVV must be exactly 3 digits")
      .required("Required"),
  });

  return (
    <div className="onboarding-container">
      <h2 className="onboarding-title">Payment Information</h2>
      <div className="onboarding-form-content">
        <Formik
          initialValues={{ cardNumber: "", expiryDate: "", cvv: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(setPaymentInfo(values));
            dispatch(nextStep());
          }}
        >
          {({ isValid, handleSubmit, dirty }) => (
            <Form className="form">
              <div className="input-group">
                <Field
                  name="cardNumber"
                  placeholder="Card Number *"
                  className="input-field"
                />
                <ErrorMessage
                  name="cardNumber"
                  component="div"
                  className="error-text"
                />
              </div>

              <div className="input-group">
                <Field
                  name="expiryDate"
                  placeholder="MM/YY *"
                  className="input-field"
                />
                <ErrorMessage
                  name="expiryDate"
                  component="div"
                  className="error-text"
                />
              </div>

              <div className="input-group">
                <Field name="cvv" placeholder="CVV *" className="input-field" />
                <ErrorMessage
                  name="cvv"
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
