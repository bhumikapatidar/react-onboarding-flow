import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../../styles/Onboarding.css";
import OnboardingNavigation from "./OnboardingNavigation";
import { usePaymentInfo } from "../../hooks/usePaymentInfo";

export const PaymentInfo: React.FC = () => {
  const { initialValues, validationSchema, handleFieldChange, handleSubmit } =
    usePaymentInfo();

  return (
    <div className="onboarding-container">
      <h2 className="onboarding-title">Payment Information</h2>
      <div className="onboarding-form-content">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ values, isValid, handleSubmit, dirty, setFieldValue }) => {
            const isFormFilled = Object.values(values).every(Boolean);

            return (
              <Form className="form">
                <div className="input-group">
                  <Field
                    name="cardNumber"
                    placeholder="Card Number *"
                    className="input-field"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleFieldChange(
                        "cardNumber",
                        e.target.value,
                        values,
                        setFieldValue
                      );
                    }}
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleFieldChange(
                        "expiryDate",
                        e.target.value,
                        values,
                        setFieldValue
                      );
                    }}
                  />
                  <ErrorMessage
                    name="expiryDate"
                    component="div"
                    className="error-text"
                  />
                </div>

                <div className="input-group">
                  <Field
                    name="cvv"
                    placeholder="CVV *"
                    className="input-field"
                    maxLength={3}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleFieldChange(
                        "cvv",
                        e.target.value,
                        values,
                        setFieldValue
                      );
                    }}
                  />
                  <ErrorMessage
                    name="cvv"
                    component="div"
                    className="error-text"
                  />
                </div>

                <OnboardingNavigation
                  isNextDisabled={!(isValid && (dirty || isFormFilled))}
                  onNext={handleSubmit}
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
