export type MovieType = "movie" | "series" | "episode" | "any";

export enum MovieTypeValue {
  ANY = "any",
  MOVIE = "movie",
  SERIES = "series",
  EPISODE = "episode",
}

export enum MovieLabelValue {
  ANY = "Any",
  MOVIE = "Movies",
  SERIES = "Series",
  EPISODE = "Episodes",
}

export type OmdSearchParams = {
  apiKey: string;
  s: string;
  y?: number;
  type?: MovieType;
  page: number;
};

export type OmdDetailParams = {
  apiKey: string;
  i: string;
};

export type OmdMovieItem = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: MovieType;
  Poster: string;
};

export type OmdSearchResponse = {
  totalResults: string;
  Response: string;
  Search: OmdMovieItem[];
  Error?: string;
};

type OmdMovieRating = {
  Source: string;
  Value: string;
};

export type OmdDetailResponse = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: OmdMovieRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
  Error?: string;
};
