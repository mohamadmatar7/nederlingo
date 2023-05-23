/**
 * A Home Controller
 */

import DataSource from "../lib/DataSource.js";

export const courses = async (req, res) => {
  // render the courses page
  res.render("vakken-leerling", {
    user: req.user,
    meta: meta,
    courses: req.classroom.subjects
  });
};
