import { ChangeEvent } from "react";
import { TStates, Tag } from "../../../models";

export const CheckBoxGroupInput = ({
  tags,
  value_state_set,
  check_state_set,
}: {
  tags: Array<Tag>;
  value_state_set: TStates<string>;
  check_state_set: TStates<boolean>;
}) => {
  const handle_onchange = (
    e: ChangeEvent<HTMLInputElement>,
    position: number
  ) => {
    const updated_checked_state = check_state_set.states.map((item, index) =>
      index === position ? !item : item
    );
    check_state_set.dispatch(updated_checked_state);
    const values = value_state_set.states;
    const find = values.indexOf(e.target.value);
    if (e.target.checked && find === -1) {
      values.push(e.target.value);
    } else if (!e.target.checked && find > -1) {
      values.splice(find, 1);
    }
    value_state_set.dispatch(values);
  };

  return (
    <div className="container-fluid">
      <div className="d-flex flex-wrap">
        {tags.map((tag, index) => (
          <div key={`checkbox-${index}`} className="p-1">
            <div className="me-2">
              <input
                type="checkbox"
                className="btn-check"
                id={tag.id.toString()}
                value={tag.name}
                checked={check_state_set.states[index]}
                onChange={(e) => handle_onchange(e, index)}
                autoComplete="off"
              />
              <label
                className="btn btn-outline-info"
                htmlFor={tag.id.toString()}
              >
                {tag.name}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
