import { Box, Card, CircularProgress } from "@mui/material";
import { MovieDisplayCard } from "./MovieDisplayCard";
import { OmdMovieItem } from "@/types";
import { useSelectedMovie } from "@/contexts/selectedMovieContext/useSelectedMovie";

type MovieScrollListProps = {
  totalResults: string;
  movieItems: OmdMovieItem[];
  loading: boolean;
};

export const MovieScrollList = ({
  totalResults = "",
  movieItems = [],
  loading,
}: MovieScrollListProps) => {
  const { selectedImdbID, setSelectedImdbID } = useSelectedMovie();

  if (loading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <>
      <Box height={"100%"} overflow={"auto"}>
        <Card sx={{ height: "80px", fontSize: "18px", padding: "3px" }}>
          {totalResults} RESULTS
        </Card>
        {movieItems.map((movieItem) => {
          return (
            <MovieDisplayCard
              movieItem={movieItem as OmdMovieItem}
              selected={movieItem.imdbID === selectedImdbID}
              key={movieItem.imdbID}
              onClick={() => {
                setSelectedImdbID(movieItem.imdbID);
              }}
            />
          );
        })}
      </Box>
    </>
  );
};
