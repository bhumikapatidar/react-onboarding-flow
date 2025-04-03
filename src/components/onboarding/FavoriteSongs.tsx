import { Formik, Form, FieldArray } from "formik";
import "../../styles/Onboarding.css";
import OnboardingNavigation from "./OnboardingNavigation";
import { useFavoriteSongs } from "../../hooks/useFavoriteSongs";
import { SongInput } from "./SongInput";

export const FavoriteSongs = () => {
  const { initialValues, handleSubmit, handleSaveSongs, validationSchema } =
    useFavoriteSongs();

  return (
    <div className="onboarding-container">
      <h2 className="onboarding-title">Favorite Songs</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleSubmit, setFieldValue }) => {
          const hasValidSongs = values.songs.some((song) => song.trim() !== "");

          return (
            <Form className="form-card">
              <FieldArray name="songs">
                {({ push, remove }) => (
                  <div className="songs-list">
                    {values.songs.map((_, index) => (
                      <SongInput
                        key={index}
                        index={index}
                        values={values}
                        setFieldValue={setFieldValue}
                        remove={remove}
                        handleSaveSongs={handleSaveSongs}
                      />
                    ))}
                    <button
                      type="button"
                      className="btn-add"
                      onClick={() => {
                        push("");
                        handleSaveSongs([...values.songs, ""]);
                      }}
                    >
                      + Add Song
                    </button>
                  </div>
                )}
              </FieldArray>
              <OnboardingNavigation
                isNextDisabled={!hasValidSongs}
                onNext={handleSubmit}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
