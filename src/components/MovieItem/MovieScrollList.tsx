import { Box, Card } from "@mui/material";
import { MovieDisplayCard } from "./MovieDisplayCard";
import { OmdMovieItem } from "@/types";

export const MovieScrollList = () => {
  const { totalResults, Search: movieItems } = {
    totalResults: 582,
    Search: [
      {
        Title: "Spider-Man: No Way Home",
        Year: "2021",
        imdbID: "tt10872600",
        Type: "movie",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg",
      },
      {
        Title: "Spider-Man",
        Year: "2002",
        imdbID: "tt0145487",
        Type: "movie",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg",
      },
      {
        Title: "Spider-Man: Homecoming",
        Year: "2017",
        imdbID: "tt2250912",
        Type: "movie",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BODY2MTAzOTQ4M15BMl5BanBnXkFtZTgwNzg5MTE0MjI@._V1_SX300.jpg",
      },
      {
        Title: "Spider-Man 2",
        Year: "2004",
        imdbID: "tt0316654",
        Type: "movie",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BMzY2ODk4NmUtOTVmNi00ZTdkLTlmOWYtMmE2OWVhNTU2OTVkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
      },
      {
        Title: "The Amazing Spider-Man",
        Year: "2012",
        imdbID: "tt0948470",
        Type: "movie",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BMjMyOTM4MDMxNV5BMl5BanBnXkFtZTcwNjIyNzExOA@@._V1_SX300.jpg",
      },
      {
        Title: "Spider-Man: Into the Spider-Verse",
        Year: "2018",
        imdbID: "tt4633694",
        Type: "movie",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1_SX300.jpg",
      },
      {
        Title: "Spider-Man 3",
        Year: "2007",
        imdbID: "tt0413300",
        Type: "movie",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BYTk3MDljOWQtNGI2My00OTEzLTlhYjQtOTQ4ODM2MzUwY2IwXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
      },
      {
        Title: "Spider-Man: Far from Home",
        Year: "2019",
        imdbID: "tt6320628",
        Type: "movie",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BODA5MTY0OWUtNjdlOC00NDI5LWE3NjYtNDM4MDI2MzE4OWUxXkEyXkFqcGdeQXVyOTAzODkzMjI@._V1_SX300.jpg",
      },
      {
        Title: "The Amazing Spider-Man 2",
        Year: "2014",
        imdbID: "tt1872181",
        Type: "movie",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BOTA5NDYxNTg0OV5BMl5BanBnXkFtZTgwODE5NzU1MTE@._V1_SX300.jpg",
      },
      {
        Title: "Spider-Man: Across the Spider-Verse",
        Year: "2023",
        imdbID: "tt9362722",
        Type: "movie",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg",
      },
    ],
  };
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
              selected={movieItem.imdbID === "tt0145487"}
              key={movieItem.imdbID}
              onClick={() => {
                console.log("select this", movieItem.imdbID);
              }}
            />
          );
        })}
      </Box>
    </>
  );
};
