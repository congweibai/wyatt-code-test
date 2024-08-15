import { useCallback, useState } from "react";
import { OMD_API_KEY, OMD_BASE_URL } from "@/constants";
import axios, { AxiosResponse } from "axios";
import { OmdDetailParams, OmdDetailResponse } from "@/types";

type MovieDetailInput = {
  imdbID: string;
};

export const useMovieDetail = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<OmdDetailResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!OMD_API_KEY) {
    console.error("No OMD API been found");
    return { loading, response, error, getMovieDetail: () => {} };
  }

  const getMovieDetail = useCallback(async (input: MovieDetailInput) => {
    const { imdbID } = input;
    const params: OmdDetailParams = { apiKey: OMD_API_KEY, i: imdbID };

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const response: AxiosResponse<OmdDetailResponse> = await axios.get(
        OMD_BASE_URL,
        {
          params,
        }
      );
      const data: OmdDetailResponse = response.data;

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
    getMovieDetail,
  };
};
