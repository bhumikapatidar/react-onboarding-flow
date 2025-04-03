import { useDispatch, useSelector } from "react-redux";
import { nextStep, setPaymentInfo } from "../redux/onboardingSlice";
import { RootState } from "../redux/store";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export interface PaymentFormValues {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export const validationSchema = Yup.object({
  cardNumber: Yup.string()
    .matches(/^\d{16}$/, "Card number must be exactly 16 digits")
    .required("Required"),
  expiryDate: Yup.string()
    .matches(
      /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
      "Expiry date must be in MM/YY format"
    )
    .test("valid-date", "Card is expired", (value) => {
      if (!value) return false;

      const [month, year] = value.split("/").map(Number);
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;

      return (
        year > currentYear || (year === currentYear && month >= currentMonth)
      );
    })
    .required("Required"),
  cvv: Yup.string()
    .matches(/^\d{3}$/, "CVV must be exactly 3 digits")
    .required("Required"),
});

export const usePaymentInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { paymentInfo } = useSelector((state: RootState) => state.onboarding);

  const initialValues: PaymentFormValues = {
    cardNumber: paymentInfo.cardNumber || "",
    expiryDate: paymentInfo.expiryDate || "",
    cvv: paymentInfo.cvv || "",
  };

  const handlePaymentInfoSave = (values: PaymentFormValues) => {
    dispatch(setPaymentInfo(values));
  };

  const handleFieldChange = (
    fieldName: keyof PaymentFormValues,
    value: string,
    values: PaymentFormValues,
    setFieldValue: (field: string, value: any) => void
  ) => {
    setFieldValue(fieldName, value);
    handlePaymentInfoSave({ ...values, [fieldName]: value });
  };

  const handleSubmit = (values: PaymentFormValues) => {
    handlePaymentInfoSave(values);
    dispatch(nextStep());
    navigate("/success");
  };

  return {
    initialValues,
    validationSchema,
    handleFieldChange,
    handleSubmit,
  };
};
