import MovieModel from "../models/movie.model.js";

const genres = [
  { label: "Action", value: "action" },
  { label: "Horror", value: "horror" },
  { label: "Comedy", value: "comedy" },
  { label: "Suspense", value: "suspense" },
  { label: "Documentaries", value: "documentaries" },
];

export const getIndex = (req, res) => {
  MovieModel.getAll((movies) => {
    res.render("movie/index", {
      pageTitle: "Home",
      movies: movies,
      genres: genres,
      hasMovies: movies.length > 0,
      homeActive: true,
    });
  });
};

export const getByGenre = (req, res) => {
  const genre = req.params.genre;

  MovieModel.getByGenre(genre, (movies) => {
    res.render("movie/index", {
      pageTitle: "Home",
      movies: movies,
      genres: genres,
      hasMovies: movies.length > 0,
      homeActive: true,
    });
  });
};
