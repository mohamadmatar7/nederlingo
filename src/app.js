// import dotenv
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { create } from "express-handlebars";
import bodyParser from "body-parser";
import cookieparser from "cookie-parser";
import methodOverride from "method-override";

import { VIEWS_PATH } from "./consts.js";

import HandlebarsHelpers from "./lib/HandlebarsHelpers.js";
import DataSource from "./lib/DataSource.js";

// import actions from controllers
import { home } from "./controllers/home.js";
import { file } from "./controllers/file.js";
import { fileD } from "./controllers/filedirecteur.js";
import { courses } from "./controllers/courses.js";
import { coursesP } from "./controllers/coursesprincipal.js";
import { classesP } from "./controllers/classesprincipal.js";
import { userP } from "./controllers/studentfile.js";
import { classP } from "./controllers/classprincipal.js";
import { feedbackR } from "./controllers/feedbackpage.js";
import { dashboard } from "./controllers/overzicht.js";
import {
  getAbsence,
  getAbsences,
  postAbsence,
} from "./controllers/api/absence.js";
import { postAttendance } from "./controllers/api/attendance.js";

import {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  getUserByFirstName,
  AddUserToClass,
  changeUserClass,
  postAvatar,
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
  getSubjectsP,
  getSubject,
  deleteSubject,
  postSubject,
  AddSubjectToClass,
} from "./controllers/api/subject.js";

import {
  getAllFeedback,
  getFeedback,
  deleteFeedback,
  postFeedback,
  updateFeedback,
} from "./controllers/api/feedback.js";
import multer from "multer";

// vakken import
import { saveAvatar } from "./middleware/avatar.js";
import { absenceR } from "./controllers/absences.js";
import { feedback } from "./controllers/feedback.js";
import { afwezigheden } from "./controllers/afwezigheden.js";
import { details } from "./controllers/details.js";
import { classStudent } from "./controllers/classstudent.js";
import { userStudent } from "./controllers/filecolleague.js";
import { subjectP } from "./controllers/subjectsprincipal.js";
import { subjectsM } from "./controllers/mentor_subjects.js";
import { classesM } from "./controllers/classes_mentor.js";
import { fileM } from "./controllers/file_mentor.js";
import { classM } from "./controllers/class_mentor.js";
import { userM } from "./controllers/student_file_mentor.js";
import { classesT } from "./controllers/classes_teacher.js";

const app = express();
app.use(express.static("public"));
app.use(methodOverride("_method"));

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
// app.get("/vakken", jwtAuth, getSubjects, courses);
app.get("/allevakken", jwtAuth, getSubjectsP, coursesP);
app.get("/begeleider_vakken", jwtAuth, getSubjectsP, subjectsM);
app.get("/alleklassen", jwtAuth, getClasses, classesP);
app.get("/lesgever_klassen", jwtAuth, getUser, classesT);
app.get("/begeleider_klassen", jwtAuth, getClasses, classesM);
app.get("/afwezigheden", jwtAuth, getAbsence, absenceR);
app.get("/alleklassen/:id", jwtAuth, getClass, classP);
app.get("/begeleider_klassen/:id", jwtAuth, getClass, classM);
app.get("/vak/:id", jwtAuth, getSubject, subjectP);
app.get("/klas/:id", jwtAuth, getClass, classStudent);
app.get("/user/:id", jwtAuth, getUser, userP);
app.get("/user_begeleider/:id", jwtAuth, getUser, userM);
app.get("/person/:id", jwtAuth, getUser, userStudent);
app.delete("/users/:id", jwtAuth, deleteUser);
app.get("/feedback", jwtAuth, getFeedback, feedbackR);
app.get("/dossier", jwtAuth, file);
app.get("/dossier_begeleider", jwtAuth, fileM);
app.get("/dossier-directeur", jwtAuth, fileD);
app.get("/overzicht", jwtAuth, dashboard);
app.get("/register", register);
app.post(
  "/register",
  registerAuthentication,
  postRegister,
  register,
  AddUserToClass
);
app.post("/login", loginAuthentication, postLogin, login);
app.post("/logout", logout);

// sidebar
app.get("/vakken", jwtAuth, getSubjects, courses);
app.get("/dossier", jwtAuth, file);
app.get("/feedback", jwtAuth, feedback);
app.get("/afwezigheden", jwtAuth, afwezigheden);

// routings van dossier
app.get("/details", jwtAuth, details);

/**
 * API Routing
 */
//Users routes
app.get("/api/users", getUsers);
app.get("/absence", getAbsences);
app.get("/absence/:id", getAbsence);
app.post("/absence", postAbsence);
app.get("/api/users/:id", getUser);
app.delete("/api/users/:id", deleteUser);
app.post("/users/addtoclass", AddUserToClass);
app.post("/vakken/addtoclass", AddSubjectToClass);
app.put("/users/changeclass", changeUserClass);
app.post("/api/users/:id", multer().single("avatar"), saveAvatar, postAvatar);
app.put("/users/:id", updateUser);
app.post("/api/users/:id", multer().single("avatar"), saveAvatar, postAvatar);
app.put("/api/users/:id", updateUser);
app.get("/users/firstname/:firstname", getUserByFirstName);

//Classes routes
app.get("/api/classes", getClasses);
app.get("/classes/:id", getClass);
app.delete("/api/classes/:id", deleteClass);
app.post("/classes", postClass);
app.put("/api/classes/:id", updateClass);

//Subjects routes
app.get("/api/subjects", getSubjects);
app.get("/api/allsubjects", getSubjectsP);
app.get("/api/subjects/:id", getSubject);
app.delete("/api/subjects/:id", deleteSubject);
app.post("/subjects", postSubject);
app.post("/attendance/:id", postAttendance);

//Feedbacks routes
app.get("/api/feedback", getAllFeedback);
// app.get("/api/feedback/:id", getFeedback);
app.delete("/api/feedback/:id", deleteFeedback);
app.post("/feedback/:id", postFeedback);
app.put("/api/feedback/:id", updateFeedback);

// Oefeningen

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
    // console.log("Error: ", error);
  });
