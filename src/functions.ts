import { Toggle as _Toggle } from "./interfaces/interfaces";

export const toggleFunction = ({ changeToggle, current }: _Toggle) => {
  changeToggle(!current);
};
