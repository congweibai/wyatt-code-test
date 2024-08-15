import { OmdMovieItem } from "@/types";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
type MovieDisplayCard = {
  movieItem: OmdMovieItem;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  selected: boolean;
};

export const MovieDisplayCard = ({
  movieItem,
  selected,
  onClick,
}: MovieDisplayCard) => {
  return (
    <Card
      sx={{
        display: "flex",
        padding: "10px 15px",
        border: "0.5px solid grey",
        borderRadius: "0",
        backgroundColor: selected ? "#e8e8e8" : "",
        alignItems: "center",
      }}
      data-testid='movie-display-card'
      onClick={onClick}
    >
      <CardMedia
        component='img'
        sx={{
          objectFit: "cover",
          width: "70px",
          height: "70px",
        }}
        image={movieItem.Poster}
        alt={`${movieItem.Title}'s poster`}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component='div' variant='h5'>
            {movieItem.Title}
          </Typography>
          <Typography
            variant='subtitle1'
            color='text.secondary'
            component='div'
          >
            {movieItem.Year}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};
