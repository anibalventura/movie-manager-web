import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "../data/movies.data.json");

const getAllMoviesFromFile = function (callBack) {
  fs.readFile(dataPath, function (error, data) {
    if (error) {
      callBack([]);
    } else {
      callBack(JSON.parse(data));
    }
  });
};

class Movie {
  constructor(id, title, imageUrl, description, genre, status) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.genre = genre;
    this.status = status;
  }

  save() {
    getAllMoviesFromFile((movies) => {
      if (this.id) {
        const editMovieIndex = movies.findIndex(
          (movie) => movie.id === this.id
        );

        movies[editMovieIndex] = this;

        fs.writeFile(dataPath, JSON.stringify(movies), function (error) {
          console.log(error);
        });
      } else {
        this.id = Math.random().toString();

        movies.push(this);

        fs.writeFile(dataPath, JSON.stringify(movies), function (error) {
          console.log(error);
        });
      }
    });
  }

  static getAll(callBack) {
    getAllMoviesFromFile(callBack);
  }

  static getByGenre(genre, callBack) {
    getAllMoviesFromFile((movies) => {
      const newMovieList = movies.filter((movie) => movie.genre === genre);
      callBack(newMovieList);
    });
  }

  static getById(id, callBack) {
    getAllMoviesFromFile((movies) => {
      const movie = movies.find((p) => p.id === id);
      callBack(movie);
    });
  }

  static delete(id) {
    getAllMoviesFromFile((movies) => {
      const newMovieList = movies.filter((movie) => movie.id !== id);

      fs.writeFile(dataPath, JSON.stringify(newMovieList), function (error) {
        console.log(error);
      });
    });
  }
}

export default Movie;
