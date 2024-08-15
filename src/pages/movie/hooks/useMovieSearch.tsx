import { useCallback, useState } from "react";
import { OMD_API_KEY, OMD_BASE_URL } from "@/constants";
import axios, { AxiosResponse } from "axios";

type MovieType = "movie" | "series" | "episode";

type OmdParams = {
  apiKey: string;
  s: string;
  y?: number;
  type?: MovieType;
};

type OmdMovieItem = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: MovieType;
  Poster: string;
};

type OmdResponse = {
  totalResults: string;
  Response: string;
  Search: OmdMovieItem[];
  Error?: string;
};

type MovieSearchInput = {
  title: string;
  // TO DO: comfirm year range search, design is a range but api only support single year
  year?: number;
  type?: MovieType;
};

export const useMovieSearch = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<OmdResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!OMD_API_KEY) {
    console.error("No OMD API been found");
    return { loading, response, error, getMovieList: () => {} };
  }

  const getMovieList = useCallback(async (input: MovieSearchInput) => {
    const { title, year, type } = input;
    const params: OmdParams = { apiKey: OMD_API_KEY, s: title };
    if (year) {
      params.y = year;
    }
    if (type) {
      params.type = type;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const response: AxiosResponse<OmdResponse> = await axios.get(
        OMD_BASE_URL,
        {
          params,
        }
      );
      const data: OmdResponse = response.data;

      if (data.Response === "True") {
        setResponse(data);
      } else {
        setError(data.Error || "No results found.");
      }
    } catch (error) {
      setError("An error occurred during movie list retrieval.");
      console.error("An error occurred during get movie list:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    response,
    error,
    getMovieList,
  };
};
