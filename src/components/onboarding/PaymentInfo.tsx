import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { nextStep, setPaymentInfo } from "../../redux/onboardingSlice";
import "../../styles/Onboarding.css";

export const PaymentInfo = () => {
  const dispatch = useDispatch();

  return (
    <div className="onboarding-container">
      <h2 className="onboarding-title">Payment Information</h2>
      <Formik
        initialValues={{ cardNumber: "", expiryDate: "", cvv: "" }}
        onSubmit={(values) => {
          dispatch(setPaymentInfo(values));
          dispatch(nextStep());
        }}
      >
        {({ handleSubmit }) => (
          <Form className="form-card" onSubmit={handleSubmit}>
            <div className="input-group">
              <Field
                className="input-field"
                name="cardNumber"
                placeholder="Card Number"
              />
            </div>
            <div className="input-group">
              <Field
                className="input-field"
                name="expiryDate"
                placeholder="Expiry Date"
              />
            </div>
            <div className="input-group">
              <Field className="input-field" name="cvv" placeholder="CVV" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
