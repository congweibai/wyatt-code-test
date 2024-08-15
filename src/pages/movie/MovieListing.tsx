import { MovieDetails } from "@/components/MovieDetails";
import { MovieScrollList } from "@/components/MovieItem";
import { SelectedMovieProvider } from "@/contexts/selectedMovieContext/SelectedMovieProvider";
import { Grid, Paper, styled } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  height: "100%",
  border: "1px solid red",
}));

export const MovieListing = () => {
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} height={"90px"}>
          <Item>xs=12</Item>
        </Grid>
        <SelectedMovieProvider>
          <Grid item xs={4} height={"600px"}>
            <Item>
              <MovieScrollList />
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
