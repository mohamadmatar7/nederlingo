import DataSource from "../lib/DataSource.js";

export const courses = async (req, res) => {
  const metaRepo = DataSource.getRepository("UserMeta");
  const meta = await metaRepo.findOne({
    where: { id: req.user.id },
  });
  const userRepo = DataSource.getRepository("User");
  const user = await userRepo.findOne({
    where: { id: req.body.id },
    relations: ["classrooms", "classrooms.subjects"],
  });
  const oneClass = user.classrooms;
  // const subjects = req.user.classrooms.subjects

  res.render("vakkenleerling", {
    actSidebar: "Klassen",
    user: req.user,
    meta: meta,
    courses: req?.classrooms,
    class: oneClass,
  });
};
