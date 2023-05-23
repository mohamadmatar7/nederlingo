/**
 * A Home Controller
 */

import DataSource from "../lib/DataSource.js";

export const courses = async (req, res) => {
  res.render("vakkenleerling", {
    user: req.user,
    meta: meta,
    courses: req.classroom.subjects
  });
};
