import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Grow from "@material-ui/core/Grow";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    overflow: "hidden",
    backgroundColor: "red",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    justifySelf: "center",
    justifyContent: "center",
  },

  gridList: {
    width: 400,
    height: 350,
    // paddingBottom: "1rem",
    paddingTop: 4,
    paddingBottom: 3,
    backgroundColor: "rgba(193, 66, 66, 0.18)",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    justifySelf: "center",
    justifyContent: "center",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  img: {
    height: `20rem !important`,
    objectFit: "cover !important",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    justifySelf: "center",
    justifyContent: "center",
    opacity: 0.7,
    transition: "transform .2s",
    zIndex: 1,
    "&:hover": {
      opacity: 1,
      transform: "scale(1.05) rotate(-1deg)",
    },
  },
}));

export const MovieImages = (movie) => {
  const classes = useStyles();
  const { movieImages } = movie;

  return (
    <>
      {movieImages.poster_path ? (
        <Grow in={true} style={{ transitionDelay: "100ms" }}>
          <GridList key={movieImages.id} className={classes.gridList}>
            <GridListTile className={classes.img} key={movieImages.id}>
              <img
                src={`https://image.tmdb.org/t/p/w400${movieImages.poster_path}`}
                alt={`${movieImages.title} Poster`}
              />
              <GridListTileBar
                key={movieImages.id}
                title={movieImages.title}
                subtitle={<span>Popularity: {movieImages.popularity} %</span>}
              />
            </GridListTile>
          </GridList>
        </Grow>
      ) : (
        ""
      )}
    </>
  );
};
