import { TAFormValue } from "../../../models";

export function validate_form(data: TAFormValue) {
  const validate =
    data.name.trim().length < 1 ||
    data.tags.trim().length < 1 ||
    !data.cover ||
    !data.pictures
      ? false
      : true;
  return Promise.resolve(validate);
}
