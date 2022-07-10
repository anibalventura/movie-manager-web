import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import expressHbs from "express-handlebars";
import errorRoutes from "./routes/error.routes.js";
import movieRoutes from "./routes/movie.routes.js";

const PORT = process.env.PORT || 5001;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure express to use handlebars.
app.engine(
  "hbs",
  expressHbs({
    layoutsDir: "./views/layouts",
    defaultLayout: "main-layout",
    extname: "hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "views");

// Middleware's.
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Routes.
app.use(movieRoutes);
app.use(errorRoutes);

// Start the server.
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
