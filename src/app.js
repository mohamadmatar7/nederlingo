// import dotenv
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { create } from "express-handlebars";
import bodyParser from "body-parser";
import cookieparser from "cookie-parser";

import { VIEWS_PATH } from "./consts.js";

import HandlebarsHelpers from "./lib/HandlebarsHelpers.js";
import DataSource from "./lib/DataSource.js";

// import actions from controllers
import { home } from "./controllers/home.js";
import { courses } from "./controllers/courses.js";
import {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  getUserByFirstName,
} from "./controllers/api/user.js";
import {
  login,
  register,
  postLogin,
  postRegister,
  logout,
} from "./controllers/authentication.js";

// import middleware
import registerAuthentication from "./middleware/validation/registerAuthentication.js";
import loginAuthentication from "./middleware/validation/loginAuthentication.js";
import { jwtAuth } from "./middleware/jwtAuth.js";

import {
  getClasses,
  getClass,
  deleteClass,
  postClass,
  updateClass,
} from "./controllers/api/class.js";

import {
  getSubjects,
  getSubject,
  deleteSubject,
  postSubject,
} from "./controllers/api/subject.js";

import {
  getAllFeedback,
  getFeedback,
  deleteFeedback,
  postFeedback,
  updateFeedback,
} from "./controllers/api/feedback.js";

const app = express();
app.use(express.static("public"));

/*
 * Tell Express to use the Cookie Parser
 */
app.use(cookieparser());

/**
 * Import the body parser
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Handlebars Init
 */
const hbs = create({
  helpers: HandlebarsHelpers,
  extname: "hbs",
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", VIEWS_PATH);

/**
 * App Routing
 */

app.get("/", jwtAuth, home);
app.get("/login", login);
app.get("/vakken", jwtAuth, getSubjects, courses);
// app.get("/register", register);
// app.post("/register", registerAuthentication, postRegister, register);
app.post("/login", loginAuthentication, postLogin, login);
app.post("/logout", logout);

/**
 * API Routing
 */
//Users routes
app.get("/api/users", getUsers);
app.get("/api/users/:id", getUser);
app.delete("/api/users/:id", deleteUser);
app.put("/api/users/:id", updateUser);
app.get("/api/users/firstname/:firstname", getUserByFirstName);

//Classes routes
app.get("/api/classes", getClasses);
app.get("/api/classes/:id", getClass);
app.delete("/api/classes/:id", deleteClass);
app.post("/api/classes", postClass);
app.put("/api/classes/:id", updateClass);

//Subjects routes
app.get("/api/subjects", getSubjects);
app.get("/api/subjects/:id", getSubject);
app.delete("/api/subjects/:id", deleteSubject);
app.post("/api/subjects", postSubject);

//Feedbacks routes
app.get("/api/feedback", getAllFeedback);
app.get("/api/feedback/:id", getFeedback);
app.delete("/api/feedback/:id", deleteFeedback);
app.post("/api/feedback", postFeedback);
app.put("/api/feedback/:id", updateFeedback);

// start the server
DataSource.initialize()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Application is running on http://localhost:${process.env.PORT}/.`
      );
    });
  })
  .catch(function (error) {
    console.log("Error: ", error);
  });
