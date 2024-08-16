import { MovieDetails } from "@/components/MovieDetails";
import {
  MovieFilterForm,
  MovieFilterInputs,
} from "@/components/MovieFilterForm";
import { MovieScrollList } from "@/components/MovieItem";
import { SelectedMovieProvider } from "@/contexts/selectedMovieContext/SelectedMovieProvider";
import { Grid, Paper, styled } from "@mui/material";
import { useMovieSearch } from "./hooks";
import { useCallback } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  height: "100%",
  border: "1px solid red",
}));

export const MovieListing = () => {
  const { loading, response, getMovieList } = useMovieSearch();

  const handleSearch = useCallback(
    (inputs: MovieFilterInputs) => {
      getMovieList({
        title: inputs.title,
        year: inputs.year ?? inputs.year,
        type: inputs.type !== "any" ? inputs.type : "",
      });
    },
    [getMovieList]
  );

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} height={"90px"}>
          <Item>
            <MovieFilterForm handleSearch={handleSearch} />
          </Item>
        </Grid>
        <SelectedMovieProvider>
          <Grid item xs={4} height={"600px"}>
            <Item>
              <MovieScrollList
                totalResults={response?.totalResults || "0"}
                movieItems={response?.Search || []}
                loading={loading}
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
