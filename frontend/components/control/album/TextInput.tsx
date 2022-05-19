import { ChangeEvent } from "react";
import { TState } from "../../../models";

export const TextInput = ({
  label,
  name,
  placeholder,
  state_set,
}: {
  label: string;
  name: string;
  placeholder: string;
  state_set: TState<string>;
}) => {
  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    state_set.dispatch(e.target.value);
  };
  return (
    <>
      {" "}
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type="text"
        className="form-control"
        id={name}
        placeholder={placeholder}
        name={name}
        value={state_set.state}
        onChange={handler}
      />
    </>
  );
};
