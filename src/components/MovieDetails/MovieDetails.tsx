import { useSelectedMovie } from "@/contexts/selectedMovieContext/useSelectedMovie";

export const MovieDetails = () => {
  const { selectedImdbID } = useSelectedMovie();

  return <>Detail goes here: {selectedImdbID}</>;
};
