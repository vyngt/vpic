import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { TFileInput, TState } from "../../../models";

export const PictureInput = ({
  label,
  name,
  text_state_set,
  file_dispatcher,
}: {
  label: string;
  name: string;
  text_state_set: TState<string>;
  file_dispatcher: TFileInput;
}) => {
  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    text_state_set.dispatch(e.target.value);
    const file_list = e.target.files;
    if (file_list === null) return;
    if (file_dispatcher.multiple) {
      file_dispatcher.dispatch([...file_list]);
    } else {
      file_dispatcher.dispatch(file_list[0]);
    }
  };
  return (
    <>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        className="form-control"
        type="file"
        id={name}
        name={name}
        accept="image/*"
        required
        multiple={file_dispatcher.multiple}
        value={text_state_set.state}
        onChange={handler}
      />
    </>
  );
};
