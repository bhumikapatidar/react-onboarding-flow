import { Formik, Form, Field, FieldArray } from "formik";
import { useDispatch } from "react-redux";
import { nextStep, setFavoriteSongs } from "../../redux/onboardingSlice";
import "../../styles/Onboarding.css";

export const FavoriteSongs = () => {
  const dispatch = useDispatch();

  return (
    <div className="onboarding-container">
      <h2 className="onboarding-title">Favorite Songs</h2>
      <Formik
        initialValues={{ songs: [""] }}
        onSubmit={(values) => {
          dispatch(setFavoriteSongs(values.songs));
          dispatch(nextStep());
        }}
      >
        {({ values }) => (
          <Form className="form-card">
            <FieldArray name="songs">
              {({ push, remove }) => (
                <div className="songs-list">
                  {values.songs.map((_, index) => (
                    <div className="input-group" key={index}>
                      <div className="input-wrapper">
                        <Field
                          name={`songs.${index}`}
                          placeholder="Song Name"
                          className="input-field"
                        />
                        <button
                          type="button"
                          className="small-btn-remove"
                          onClick={() => remove(index)}
                        >
                          ✖
                        </button>
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
          </Form>
        )}
      </Formik>
    </div>
  );
};
