import MovieModel from "../models/movie.model.js";
import genres from "../data/genres.data.js";

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
