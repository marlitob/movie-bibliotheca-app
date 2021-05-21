import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { Container } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { MovieImages } from "../components/MovieImages";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { requestMovieInfo } from "../actions/searchQueryActions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "rgba(193, 66, 66, 0.26)",
    paddingTop: "2rem",
    paddingBottom: "2rem",
  },
  gridList: {
    width: 500,
    height: 700,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  main: {
    display: "flex",
    paddingTop: "4rem",
    paddingBottom: "3rem",
    flexDirection: "column",
    // backgroundColor: "red",
  },
  title: {
    paddingBottom: "1rem",
    flexDirection: "column",
  },
  paragraph: {
    paddingBottom: "1.5rem",
    flexDirection: "column",
  },
  movies: {
    flexDirection: "row",
  },
  input: {
    color: "white !important",
    borderWidth: "1px",
    // backgroundColor: "red",
  },
}));

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "fuchsia",
    },
    "& label": {
      color: "#E0E0E0",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "purple",
      },
      "&:hover fieldset": {
        borderColor: "fuchsia",
      },
      "&.Mui-focused fieldset": {
        borderColor: "fuchsia",
      },
    },
  },
})(TextField);

export default function Movies() {
  const [title, setTitle] = useState();
  const [movieList, setMovieList] = useState([]);

  const onChange = async (e) => {
    const searchValue = e.target.value === "" ? setTitle("") : e.target.value;
    const key = e.nativeEvent.data;
    if (key === " " || key === null) {
      console.log("blank");
      setTitle("");
      return null;
    } else {
      setTitle(e.target.value);

      // Api call to back-end service hosted at api.projectlifeusa.com/themoviedb

      await requestMovieInfo(e.target.value).then(
        (response) => {
          setMovieList(response);
        },
        (err) => {
          console.log(err);
        }
      );

      // This test the api directly to themoviedb.org from the front-end use for testing only as this method exposes the api key via chrome dev tools

      // fetch(
      //   `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${title}`
      // )
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log(data.results);
      //     !data.errors ? setMovieList(data.results) : setMovieList([]);
      //   });
    }
  };

  const classes = useStyles();

  return (
    <Container className={classes.main} color={"secondary"}>
      <Typography
        className={classes.title}
        variant="h3"
        component="h1"
        color={"secondary"}
        align={"center"}
      >
        Welcome To The Movie Bibliotheca
      </Typography>
      <Typography
        className={classes.paragraph}
        variant="h5"
        component="p"
        color={"primary"}
        align={"center"}
      >
        The Webs Number One (Numero Uno) Location To Search For Your Favorite
        Movie Titles!
      </Typography>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CssTextField
          onChange={onChange}
          style={{ paddingBottom: "3rem" }}
          InputProps={{
            className: classes.input,
          }}
          label="Search A Movie Title"
          variant="outlined"
          id="custom-css-outlined-input"
        />
      </div>
      <div
        style={{
          display: title === "" || movieList.length === 0 ? "none" : "",
        }}
        className={classes.root}
      >
        {movieList.map((movie) => (
          <MovieImages
            key={movie.id}
            className={classes.movies}
            movieImages={movie}
          />
        ))}
      </div>
    </Container>
  );
}
