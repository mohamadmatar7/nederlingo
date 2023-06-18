import DataSource from "../lib/DataSource.js";

export const classesM = async (req, res) => {
  const metaRepo = DataSource.getRepository("UserMeta");
  const meta = await metaRepo.findOne({
    where: { id: req.user.id },
  });
  const classRepo = DataSource.getRepository("Classroom");
  const classes = await classRepo.find();

  res.render("begeleider_klassen", {
    actSidebar: "Klassen",
    user: req.user,
    meta: meta,
    classes: classes,
  });
};
