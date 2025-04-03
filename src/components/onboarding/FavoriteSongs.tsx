import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, setFavoriteSongs } from "../../redux/onboardingSlice";
import { RootState } from "../../redux/store";
import "../../styles/Onboarding.css";
import OnboardingNavigation from "./OnboardingNavigation";

export const FavoriteSongs = () => {
  const dispatch = useDispatch();
  const { favoriteSongs } = useSelector((state: RootState) => state.onboarding);

  const validationSchema = Yup.object({
    songs: Yup.array()
      .of(Yup.string().required("Required"))
      .min(1, "At least one song is required"),
  });

  const initialValues = {
    songs: favoriteSongs.length ? favoriteSongs : [""],
  };

  // Function to save songs to Redux
  const saveSongs = (songs: string[]) => {
    const nonEmptySongs = songs.filter((song) => song.trim() !== "");
    dispatch(setFavoriteSongs(nonEmptySongs));
  };

  return (
    <div className="onboarding-container">
      <h2 className="onboarding-title">Favorite Songs</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const nonEmptySongs = values.songs.filter(
            (song) => song.trim() !== ""
          );
          dispatch(setFavoriteSongs(nonEmptySongs));
          dispatch(nextStep());
        }}
      >
        {({ values, handleSubmit, setFieldValue }) => {
          const hasValidSongs = values.songs.some((song) => song.trim() !== "");

          return (
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
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setFieldValue(`songs.${index}`, e.target.value);
                              const updatedSongs = [...values.songs];
                              updatedSongs[index] = e.target.value;
                              saveSongs(updatedSongs);
                            }}
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
                              onClick={() => {
                                remove(index);
                                const updatedSongs = [...values.songs];
                                updatedSongs.splice(index, 1);
                                saveSongs(updatedSongs);
                              }}
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
                      onClick={() => {
                        push("");
                        saveSongs([...values.songs, ""]);
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
