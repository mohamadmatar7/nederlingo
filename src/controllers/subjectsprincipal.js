import DataSource from "../lib/DataSource.js";

export const subjectP = async (req, res) => {
  const metaRepo = DataSource.getRepository("UserMeta");
  const classRepo = DataSource.getRepository("Classroom");
  const meta = await metaRepo.findOne({
    where: { id: req.user.id },
  });

  const subjectRepo = DataSource.getRepository("Subject");

  const subjects = await subjectRepo.findOne({
    where: { id: req.params.id },
    relations: ["classrooms", "classrooms.users"],
  });

  const allclassrooms = await classRepo.find({
    relations: ["users", "users.meta"],
  });

  const certainClass = await subjectRepo.findOne({
    where: { id: req.params.id },
    relations: ["classrooms", "classrooms.users"],
  });

  res.render("vakdetailsdirecteur", {
    actSidebar: "vakken",
    user: req.user,
    meta: meta,
    allclassrooms: allclassrooms,
    certainClass: certainClass,
    subject: subjects,
  });
};
