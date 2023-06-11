/**
 * A Home Controller
 */

import DataSource from "../lib/DataSource.js";

export const home = async (req, res) => {
  const user = await DataSource.getRepository("User").findOne({
    where: { id: req.user.id },
    relations: ["meta", "role", "classrooms", "classrooms.users"],
  });
  const classes = await DataSource.getRepository("Classroom").find({
    relations: ["users", "users.meta", "subjects", "users.role"],
  });

  const metaRepo = DataSource.getRepository("UserMeta");
  const meta = await metaRepo.findOne({
    where: { id: req.user.id },
  });

  const Class = await DataSource.getRepository("Classroom").findOne({
    where: { id: user.classrooms.id },
    relations: ["users", "users.meta", "subjects"],
  });
  const userRole = req.user.role.label;

  const oneClass = user.classrooms;

  const subjects = user.classrooms.subjects;

  if (userRole === "Lesgever") {
    res.render("lesgever", {
      user: user,
      Class: Class,
      classes: classes,
      meta: meta,
    });
    return;
  }

  if (userRole === "Begeleider") {
    res.render("begeleider", {
      user: user,
      Class: Class,
      classes: classes,
      meta: meta,
    });
    return;
  }

  if (userRole === "Directeur") {
    res.render("directeur", {
      user: user,
      classrooms: Class,
      classes: classes,
      meta: meta,
    });
    return;
  }

  // render the home page
  res.render("home", {
    user: req.user,
    meta: meta,
    class: oneClass,
    subjects: subjects
  });
};
