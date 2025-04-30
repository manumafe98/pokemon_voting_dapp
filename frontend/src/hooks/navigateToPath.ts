import { NavigateFunction } from "react-router-dom";

export const navigateToPath = (navigate: NavigateFunction, path: string) => {
  navigate(path);
};
