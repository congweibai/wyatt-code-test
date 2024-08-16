import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  Radio,
  RadioGroup,
  Slider,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { MovieLabelValue, MovieTypeValue } from "@/types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { getMovieRangeEndYear, getMovieRangeStartYear } from "./utils";
import { MovieFilterInputs } from "./types";

type MovieFilterFormProps = {
  handleFilterChange: (inputs: MovieFilterInputs) => void;
};

export const MovieFilterForm = ({
  handleFilterChange,
}: MovieFilterFormProps) => {
  const { register, handleSubmit, control } = useForm<MovieFilterInputs>();

  const onSubmit: SubmitHandler<MovieFilterInputs> = (data) =>
    handleFilterChange(data);

  return (
    <>
      <form style={{ height: "100%" }}>
        <Grid
          container
          columns={{ xs: 4, sm: 8, md: 12 }}
          bgcolor='#5b5b5b'
          height='100%'
          padding='10px 40px'
        >
          <Grid item xs={2} sm={4} md={4} display='flex' alignItems='center'>
            <FormControl variant='standard'>
              <Input
                {...register("title")}
                sx={{
                  fontSize: "25px",
                  color: "white",
                }}
                placeholder='Search Movies'
                disableUnderline
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // Prevent form submission on Enter key press
                  }
                }}
                startAdornment={
                  <InputAdornment position='start'>
                    <IconButton
                      onClick={handleSubmit(onSubmit)}
                      type='button'
                      aria-label='search'
                    >
                      <SearchIcon sx={{ color: "white", fontSize: "35px" }} />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={2} sm={4} md={4} display='flex' alignItems='center'>
            <Box>
              <FormControl variant='standard' sx={{ width: 300 }}>
                <FormLabel
                  sx={{
                    color: "#ffffff", // Custom color for the unchecked state
                    "&.Mui-focused": {
                      color: "#ffffff", // Custom color for the checked state
                    },
                  }}
                >
                  YEAR
                </FormLabel>
                <Grid container spacing={2} alignItems='center'>
                  <Grid item>
                    <Typography color='white'>
                      {getMovieRangeStartYear()}
                    </Typography>
                  </Grid>
                  {/* TO DO: to ask how to search by year */}
                  <Grid item xs>
                    <Controller
                      name='year'
                      control={control}
                      // defaultValue={2015}
                      render={({ field }) => (
                        <Slider
                          {...field}
                          aria-label='Movie Year'
                          // defaultValue={""}
                          valueLabelDisplay='auto'
                          shiftStep={30}
                          step={1}
                          sx={{
                            color: "white", // Sets the color of the thumb and active track to white
                            "& .MuiSlider-thumb": {
                              backgroundColor: "white", // Thumb color
                            },
                            "& .MuiSlider-track": {
                              backgroundColor: "white", // Track color
                            },
                            "& .MuiSlider-rail": {
                              backgroundColor: "#b0b0b0", // Rail color (adjust as needed)
                            },
                            "& .MuiSlider-mark": {
                              backgroundColor: "white", // Mark color
                            },
                            "& .MuiSlider-markLabel": {
                              color: "white", // Mark label color
                            },
                          }}
                          marks
                          min={getMovieRangeStartYear()}
                          max={getMovieRangeEndYear()}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item>
                    <Typography color='white'>
                      {getMovieRangeEndYear()}
                    </Typography>
                  </Grid>
                </Grid>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={2} sm={4} md={4} display='flex' alignItems='center'>
            <FormControl component='fieldset'>
              <FormLabel
                sx={{
                  color: "#ffffff", // Custom color for the unchecked state
                  "&.Mui-focused": {
                    color: "#ffffff", // Custom color for the checked state
                  },
                }}
              >
                Type
              </FormLabel>
              <Controller
                name='type'
                control={control}
                defaultValue={MovieTypeValue.ANY}
                render={({ field }) => (
                  <RadioGroup {...field} row sx={{ color: "white" }}>
                    <FormControlLabel
                      value={MovieTypeValue.ANY}
                      control={
                        <Radio
                          sx={{
                            color: "#ffffff", // Custom color for the unchecked state
                            "&.Mui-checked": {
                              color: "#ffffff", // Custom color for the checked state
                            },
                          }}
                        />
                      }
                      label={MovieLabelValue.ANY}
                    />
                    <FormControlLabel
                      value={MovieTypeValue.MOVIE}
                      control={
                        <Radio
                          sx={{
                            color: "#ffffff", // Custom color for the unchecked state
                            "&.Mui-checked": {
                              color: "#ffffff", // Custom color for the checked state
                            },
                          }}
                        />
                      }
                      label={MovieLabelValue.MOVIE}
                    />
                    <FormControlLabel
                      value={MovieTypeValue.SERIES}
                      control={
                        <Radio
                          sx={{
                            color: "#ffffff", // Custom color for the unchecked state
                            "&.Mui-checked": {
                              color: "#ffffff", // Custom color for the checked state
                            },
                          }}
                        />
                      }
                      label={MovieLabelValue.SERIES}
                    />
                    <FormControlLabel
                      value={MovieTypeValue.EPISODE}
                      control={
                        <Radio
                          sx={{
                            color: "#ffffff", // Custom color for the unchecked state
                            "&.Mui-checked": {
                              color: "#ffffff", // Custom color for the checked state
                            },
                          }}
                        />
                      }
                      label={MovieLabelValue.EPISODE}
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
