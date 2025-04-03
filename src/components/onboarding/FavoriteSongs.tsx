import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { nextStep, setFavoriteSongs } from "../../redux/onboardingSlice";
import "../../styles/Onboarding.css";
import OnboardingNavigation from "./OnboardingNavigation";

export const FavoriteSongs = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    songs: Yup.array()
      .of(Yup.string().required("Required"))
      .min(1, "At least one song is required"),
  });

  return (
    <div className="onboarding-container">
      <h2 className="onboarding-title">Favorite Songs</h2>
      <Formik
        initialValues={{ songs: [""] }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(setFavoriteSongs(values.songs));
          dispatch(nextStep());
        }}
      >
        {({ values, isValid, dirty, handleSubmit }) => (
          <Form className="form-card">
            <FieldArray name="songs">
              {({ push, remove }) => (
                <div className="songs-list">
                  {values.songs.map((_, index) => (
                    <div className="input-group" key={index}>
                      <div className="input-wrapper">
                        <Field
                          name={`songs.${index}`}
                          placeholder="Song Name *"
                          className="input-field"
                        />
                        <ErrorMessage
                          name={`songs.${index}`}
                          component="div"
                          className="error-text"
                        />
                        {values.songs.length > 1 && (
                          <button
                            type="button"
                            className="small-btn-remove"
                            onClick={() => remove(index)}
                          >
                            ✖
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn-add"
                    onClick={() => push("")}
                  >
                    + Add Song
                  </button>
                </div>
              )}
            </FieldArray>
            <OnboardingNavigation
              isNextDisabled={!(isValid && dirty)}
              onNext={handleSubmit}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};
