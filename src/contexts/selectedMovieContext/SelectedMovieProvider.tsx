import { createContext, ReactNode, useState } from "react";

export type SelectedMovieContextContextType = {
  selectedImdbID: string;
  setSelectedImdbID: (id: string) => void;
};

export const SelectedMovieContext = createContext<
  SelectedMovieContextContextType | undefined
>(undefined);

export const SelectedMovieProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedImdbID, setSelectedImdbID] = useState<string>("");

  return (
    <SelectedMovieContext.Provider
      value={{ selectedImdbID, setSelectedImdbID }}
    >
      {children}
    </SelectedMovieContext.Provider>
  );
};
