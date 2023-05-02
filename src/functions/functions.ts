import { useMutation } from "@apollo/client";

/* Function to toggle state */
export const toggleFunction = (prop: boolean): boolean => {
  return !prop;
};
