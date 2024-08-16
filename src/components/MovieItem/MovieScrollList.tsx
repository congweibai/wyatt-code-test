import { Box, Card, CircularProgress } from "@mui/material";
import { MovieDisplayCard } from "./MovieDisplayCard";
import { OmdMovieItem } from "@/types";
import { useSelectedMovie } from "@/contexts/selectedMovieContext/useSelectedMovie";
import useScrollToBottom from "@/hooks/useScrollToBottom";
import { useEffect } from "react";

type MovieScrollListProps = {
  totalResults: string;
  movieItems: OmdMovieItem[];
  loading: boolean;
  onLoadmore: () => void;
};

export const MovieScrollList = ({
  totalResults = "",
  movieItems = [],
  loading,
  onLoadmore,
}: MovieScrollListProps) => {
  const { selectedImdbID, setSelectedImdbID } = useSelectedMovie();
  const { containerRef, atBottom } = useScrollToBottom(90);

  useEffect(() => {
    if (atBottom) {
      onLoadmore();
    }
  }, [atBottom]);

  return (
    <>
      <Box
        height={"100%"}
        overflow={"auto"}
        ref={containerRef}
        data-testid='scroll-container'
      >
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
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "10px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : null}
      </Box>
    </>
  );
};
