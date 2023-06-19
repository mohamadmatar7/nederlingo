import DataSource from "../lib/DataSource.js";

export const classesT = async (req, res) => {
  const metaRepo = DataSource.getRepository("UserMeta");
  const meta = await metaRepo.findOne({
    where: { id: req.user.id },
  });
  const user = await DataSource.getRepository("User").findOne({
    where: { id: req.user.id },
    relations: ["classrooms"],
  });

  const classes = user.classrooms;

  res.render("klassen_lesgever", {
    actSidebar: "Klassen",
    user: req.user,
    meta: meta,
    classes: classes,
  });
};
