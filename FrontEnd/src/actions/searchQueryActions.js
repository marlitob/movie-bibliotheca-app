import getMovieInfo from "../api/GetMovieInfo";

export const requestMovieInfo = async (title) => {
  try {
    return await getMovieInfo.getMovies(title);
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
