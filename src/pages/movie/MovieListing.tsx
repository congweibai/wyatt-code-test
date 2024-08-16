import { MovieDetails } from "@/components/MovieDetails";
import {
  MovieFilterForm,
  MovieFilterInputs,
} from "@/components/MovieFilterForm";
import { MovieScrollList } from "@/components/MovieItem";
import { SelectedMovieProvider } from "@/contexts/selectedMovieContext/SelectedMovieProvider";
import { Grid, Paper, styled } from "@mui/material";
import { useMovieSearch } from "@/pages/movie/hooks";
import { useCallback, useEffect, useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  height: "100%",
  border: "1px solid red",
}));

export const MovieListing = () => {
  const [page, setPage] = useState(1);
  const [currentFilter, setCurrentFilter] = useState<MovieFilterInputs>();

  const { loading, response, getMovieList } = useMovieSearch();

  const handleFilterChange = useCallback((inputs: MovieFilterInputs) => {
    setCurrentFilter(inputs);
    setPage(1);
  }, []);

  useEffect(() => {
    if (currentFilter)
      getMovieList({
        title: currentFilter.title,
        year: currentFilter.year ?? currentFilter.year,
        type: currentFilter.type !== "any" ? currentFilter.type : "",
        page: page,
      });
  }, [page, currentFilter, getMovieList]);

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} height={"90px"}>
          <Item>
            <MovieFilterForm handleFilterChange={handleFilterChange} />
          </Item>
        </Grid>
        <SelectedMovieProvider>
          <Grid item xs={4} height={"600px"}>
            <Item>
              <MovieScrollList
                totalResults={response?.totalResults || "0"}
                movieItems={response?.Search || []}
                loading={loading}
                onLoadmore={() => setPage((currentPage) => currentPage + 1)}
              />
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item>
              <MovieDetails />
            </Item>
          </Grid>
        </SelectedMovieProvider>
      </Grid>
    </>
  );
};
