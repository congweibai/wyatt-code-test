import { useSelectedMovie } from "@/contexts/selectedMovieContext/useSelectedMovie";
import { useMovieDetail } from "@/pages/movie/hooks";
import { Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";

export const MovieDetails = () => {
  const { selectedImdbID } = useSelectedMovie();

  const { loading, response, getMovieDetail } = useMovieDetail();

  useEffect(() => {
    if (selectedImdbID) getMovieDetail({ imdbID: selectedImdbID });
  }, [selectedImdbID]);

  if (loading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );

  if (!selectedImdbID) return <>Please select movie to view detail</>;

  return (
    <>
      Detail goes here: {selectedImdbID}, name: {response?.Title}
    </>
  );
};
