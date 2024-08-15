import { useContext } from "react";
import {
  SelectedMovieContext,
  SelectedMovieContextContextType,
} from "./SelectedMovieProvider";

export const useSelectedMovie = (): SelectedMovieContextContextType => {
  const context = useContext(SelectedMovieContext);
  if (context === undefined) {
    throw new Error(
      "useSelectedMovie must be used within SelectedMovieProvider"
    );
  }

  return context;
};
