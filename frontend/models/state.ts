import { Dispatch, SetStateAction } from "react";

export interface TState<Type> {
  state: Type;
  dispatch: Dispatch<SetStateAction<Type>>;
}

export interface TStates<Type> {
  states: Array<Type>;
  dispatch: Dispatch<SetStateAction<Type[]>>;
}
