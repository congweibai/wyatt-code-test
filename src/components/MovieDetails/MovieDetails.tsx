import { useSelectedMovie } from "@/contexts/selectedMovieContext/useSelectedMovie";
import { useMovieDetail, useMovieWatchlist } from "@/pages/movie/hooks";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

export const MovieDetails = () => {
  const { selectedImdbID } = useSelectedMovie();
  const {
    isInWatchList,
    addToWatchList,
    removeFromWatchList,
    loading: isLoadingWatchList,
  } = useMovieWatchlist(selectedImdbID);

  const { loading, response, getMovieDetail } = useMovieDetail();

  useEffect(() => {
    if (selectedImdbID) getMovieDetail({ imdbID: selectedImdbID });
  }, [selectedImdbID]);

  if (loading)
    return (
      <Stack alignItems='center' paddingTop='20px'>
        <CircularProgress size={50} />
      </Stack>
    );

  if (!selectedImdbID) return <>Please select movie to view detail</>;

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        paddingLeft: "25px",
        boxSizing: "border-box",
      }}
    >
      <Grid container spacing={0} paddingY={2}>
        <Grid item xs={4}>
          <CardMedia
            component='img'
            sx={{
              objectFit: "contain",
            }}
            alt={`${response?.Title}'s poster`}
            height='400'
            image={response?.Poster}
          />
        </Grid>
        <Grid item xs={8} sx={{ fontSize: "20px", fontWeight: "300" }}>
          <Stack>
            <Box
              sx={{
                textAlign: "right",
                height: "120px",
                padding: "0px 25px",
              }}
            >
              {isInWatchList ? (
                <Button
                  startIcon={<BookmarkBorderIcon />}
                  variant='outlined'
                  size='large'
                  onClick={removeFromWatchList}
                  disabled={isLoadingWatchList}
                >
                  Remove
                </Button>
              ) : (
                <Button
                  startIcon={<BookmarkBorderIcon />}
                  variant='outlined'
                  size='large'
                  onClick={addToWatchList}
                  disabled={isLoadingWatchList}
                >
                  Watchlist
                </Button>
              )}
            </Box>
            <Box>
              <Typography
                gutterBottom
                variant='h5'
                component='div'
                fontSize={"40px"}
                fontWeight={"600"}
              >
                {response?.Title}
              </Typography>
            </Box>
            <Box sx={{ marginBottom: "25px" }}>
              <Typography
                component='span'
                sx={{
                  border: "1px solid black",
                  padding: "1px 12px",
                  textAlign: "center",
                  display: "inline-block",
                  borderRadius: "5px",
                  marginRight: "5px",
                }}
                variant='subtitle1'
              >
                {response?.Rated}
              </Typography>
              <Typography
                component='span'
                sx={{ marginRight: "5px" }}
                variant='subtitle1'
              >
                {response?.Year} •
              </Typography>
              <Typography
                component='span'
                sx={{ marginRight: "5px" }}
                variant='subtitle1'
              >
                {response?.Genre} •
              </Typography>
              <Typography component='span' variant='subtitle1'>
                {response?.Runtime}
              </Typography>
            </Box>
            <Box>
              <Typography variant='body1' fontSize={"20px"} fontWeight='350'>
                {response?.Actors}
              </Typography>
            </Box>
            <Box>
              <Typography variant='body1' fontSize={"20px"} fontWeight='350'>
                {response?.Director}
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <CardContent
        sx={{
          borderTop: "1px solid black",
          borderBottom: "1px solid black",
        }}
      >
        <Typography
          variant='body1'
          fontSize={"20px"}
          color='text.secondary'
          sx={{ padding: "0 10px" }}
        >
          {response?.Plot}
        </Typography>
      </CardContent>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-around",
          padding: "10px 0",
        }}
      >
        {response?.Ratings.map((rating, index) => {
          return (
            <Stack
              key={rating.Value + "" + index}
              alignItems='center'
              sx={{
                margin: "15px 0",
                padding: "0px 50px",
                borderRight:
                  index !== response.Ratings.length - 1
                    ? "1px solid black"
                    : "",
                minWidth: "200px",
              }}
            >
              <Typography fontSize='24px' fontWeight='300'>
                {rating.Value}
              </Typography>
              <Typography fontSize='18px' fontWeight='300'>
                {rating.Source}
              </Typography>
            </Stack>
          );
        })}
      </Container>
    </Card>
  );
};
