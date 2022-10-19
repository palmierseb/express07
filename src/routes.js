import express from "express";
import Controller from "./controllers/controller.js";
import UsersController from "./controllers/usersController.js";
import MoviesController from "./controllers/moviesController.js";
import authController from "./controllers/authController.js";

const Root = express.Router(); // Create a new router instance

// Home page
Root.get("/", Controller.index);
Root.get("/show", Controller.show);

// Users GET, POST, PUT, DELETE
Root.get("/users", UsersController.getUser);
Root.get("/users/:id", UsersController.getUserById);

Root.post("/users", UsersController.postUser, Controller.validateUser);
Root.put("/users", UsersController.updateUser, Controller.validateUser);
Root.delete("/users/:id", UsersController.deleteUser);

// Movies GET, POST, PUT, DELETE
Root.get("/movies", MoviesController.getMovie);
Root.get("/movies/:id", MoviesController.getMovieById);

//Auth GET, POST, PUT, DELETE
Root.get("/login", authController.login);
Root.post("/login",authController.login);

Root.get("/register", authController.register);
Root.post("/register", authController.register);

Root.get("/dashbord",authController.verifyToken ,authController.dashbord);


export default Root;