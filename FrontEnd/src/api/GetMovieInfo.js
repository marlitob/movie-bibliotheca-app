class GetMovieInfo {
  getMovies = (title) =>
    new Promise((resolve, reject) => {
      fetch(`https://api.projectlifeusa.com/themoviedb`, {
        method: "post",
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
        });
    });
}

const getMovieInfo = new GetMovieInfo();

export default getMovieInfo;
