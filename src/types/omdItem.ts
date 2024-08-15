export type MovieType = "movie" | "series" | "episode";

export type OmdParams = {
  apiKey: string;
  s: string;
  y?: number;
  type?: MovieType;
};

export type OmdMovieItem = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: MovieType;
  Poster: string;
};

export type OmdResponse = {
  totalResults: string;
  Response: string;
  Search: OmdMovieItem[];
  Error?: string;
};
