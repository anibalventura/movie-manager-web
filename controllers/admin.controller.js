import MovieModel from "../models/movie.model.js";
import genres from "../data/genres.data.js";
import * as formHelpers from "../helpers/form.helper.js";

export const getIndex = (req, res) => {
  MovieModel.getAll((movies) => {
    res.render("admin/index", {
      pageTitle: "Manage Movies",
      movies: movies,
      hasMovies: movies.length > 0,
      adminActive: true,
    });
  });
};

export const getAddMovie = (req, res) => {
  res.render("admin/save-movie", {
    pageTitle: "Add a Movie",
    genres: genres,
    adminActive: true,
    editMode: false,
    helpers: {
      isSelected: formHelpers.isSelected,
      isChecked: formHelpers.isChecked,
    },
  });
};

export const postAddMovie = (req, res) => {
  const title = req.body.Title;
  const imageUrl = req.body.ImageUrl;
  const description = req.body.Description;
  const genre = req.body.Genre;

  const movie = new MovieModel(null, title, imageUrl, description, genre, true);
  movie.save();

  res.redirect("/admin");
};

export const getEditMovie = (req, res) => {
  const movieId = req.params.movieId;
  const edit = req.query.edit;

  if (!edit) {
    return res.redirect("/admin");
  }

  MovieModel.getById(movieId, (movie) => {
    res.render("admin/save-movie", {
      pageTitle: "Edit Movie",
      movie: movie,
      genres: genres,
      editMode: edit,
      helpers: {
        isSelected: formHelpers.isSelected,
        isChecked: formHelpers.isChecked,
      },
    });
  });
};

export const postEditMovie = (req, res) => {
  const id = req.body.Id;
  const title = req.body.Title;
  const imageUrl = req.body.ImageUrl;
  const description = req.body.Description;
  const genre = req.body.Genre;
  const status = req.body.Status;

  const movie = new MovieModel(id, title, imageUrl, description, genre, status);
  movie.save();

  res.redirect("/admin");
};

export const getDeleteMovie = (req, res) => {
  const movieId = req.params.movieId;

  MovieModel.getById(movieId, (movie) => {
    res.render("admin/delete-movie", {
      pageTitle: "Delete Movie",
      movie: movie,
    });
  });
}

export const postDeleteMovie = (req, res) => {
  const id = req.body.Id;

  MovieModel.delete(id);

  res.redirect("/admin");
};
