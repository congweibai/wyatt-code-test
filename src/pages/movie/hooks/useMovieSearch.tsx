import { useState } from "react";
import { OMD_API_KEY, OMD_BASE_URL } from "@/constants";
import axios, { AxiosResponse } from "axios";
import { MovieType, OmdSearchParams, OmdSearchResponse } from "@/types";

type MovieSearchInput = {
  title: string;
  // TO DO: comfirm year range search, design is a range but api only support single year
  year?: number;
  type?: MovieType | "";
  page: number;
};

export const useMovieSearch = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<OmdSearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!OMD_API_KEY) {
    console.error("No OMD API been found");
    return { loading, response, error, getMovieList: () => {} };
  }

  const getMovieList = async (input: MovieSearchInput) => {
    const { title, year, type, page } = input;
    const params: OmdSearchParams = { apiKey: OMD_API_KEY, s: title, page };
    if (year) {
      params.y = year;
    }
    if (type) {
      params.type = type;
    }

    setLoading(true);
    setError(null);
    if (page === 1) setResponse(null);

    try {
      const response: AxiosResponse<OmdSearchResponse> = await axios.get(
        OMD_BASE_URL,
        {
          params,
        }
      );
      const data: OmdSearchResponse = response.data;

      if (data.Response === "True") {
        setResponse((currentData) => {
          if (params.page > 1) {
            console.log(">1", {
              ...data,
              Search: [...(currentData?.Search || []), ...data.Search],
            });
            return {
              ...data,
              Search: [...(currentData?.Search || []), ...data.Search],
            };
          } else {
            return data;
          }
        });
      } else {
        setError(data.Error || "No results found.");
      }
    } catch (error) {
      setError("An error occurred during movie list retrieval.");
      console.error("An error occurred during get movie list:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    response,
    error,
    getMovieList,
  };
};
