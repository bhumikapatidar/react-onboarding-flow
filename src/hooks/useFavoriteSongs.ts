import { useDispatch, useSelector } from "react-redux";
import { nextStep, setFavoriteSongs } from "../redux/onboardingSlice";
import { RootState } from "../redux/store";
import * as Yup from "yup";

export const validationSchema = Yup.object({
  songs: Yup.array()
    .of(Yup.string().required("Required"))
    .min(1, "At least one song is required"),
});

export const useFavoriteSongs = () => {
  const dispatch = useDispatch();
  const { favoriteSongs } = useSelector((state: RootState) => state.onboarding);

  const initialValues = {
    songs: favoriteSongs.length ? favoriteSongs : [""],
  };

  const handleSaveSongs = (songs: string[]) => {
    const nonEmptySongs = songs.filter((song) => song.trim() !== "");
    dispatch(setFavoriteSongs(nonEmptySongs));
  };

  const handleSubmit = (values: { songs: string[] }) => {
    const nonEmptySongs = values.songs.filter((song) => song.trim() !== "");
    dispatch(setFavoriteSongs(nonEmptySongs));
    dispatch(nextStep());
  };

  return {
    initialValues,
    handleSubmit,
    handleSaveSongs,
    validationSchema,
  };
};
