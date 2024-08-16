import { MovieType } from "@/types";

export type MovieFilterInputs = {
  title: string;
  year: number;
  type: MovieType;
};
