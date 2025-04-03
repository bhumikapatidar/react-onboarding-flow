import React from "react";
import { Field, ErrorMessage } from "formik";

interface SongInputProps {
  index: number;
  values: { songs: string[] };
  setFieldValue: (field: string, value: any) => void;
  remove: (index: number) => void;
  handleSaveSongs: (songs: string[]) => void;
}

export const SongInput: React.FC<SongInputProps> = ({
  index,
  values,
  setFieldValue,
  remove,
  handleSaveSongs,
}) => {
  return (
    <div className="input-group" key={index}>
      <div className="input-wrapper">
        <Field
          name={`songs.${index}`}
          placeholder="Song Name *"
          className="input-field"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFieldValue(`songs.${index}`, e.target.value);
            const updatedSongs = [...values.songs];
            updatedSongs[index] = e.target.value;
            handleSaveSongs(updatedSongs);
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
              handleSaveSongs(updatedSongs);
            }}
          >
            ✖
          </button>
        )}
      </div>
    </div>
  );
};
