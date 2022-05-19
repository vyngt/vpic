import { Dispatch, SetStateAction } from "react";

export interface TAFormValue {
  name: string;
  tags: string;
  cover: File | undefined;
  pictures: Array<File> | undefined;
}

export const ALBUM_FORM_INITIAL_STATE: TAFormValue = {
  name: "",
  tags: "",
  cover: undefined,
  pictures: undefined,
};

export interface TResponse {
  error: boolean;
  message: string;
}

export interface SingleFile {
  multiple: false;
  dispatch: Dispatch<SetStateAction<File | undefined>>;
}

export interface MultiFile {
  multiple: true;
  dispatch: Dispatch<SetStateAction<File[] | undefined>>;
}

export type TFileInput = SingleFile | MultiFile;
