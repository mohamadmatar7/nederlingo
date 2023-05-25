import DataSource from "../lib/DataSource.js";

export const courses = async (req, res) => {
  const metaRepo = DataSource.getRepository("UserMeta");
  const meta = await metaRepo.findOne({
    where: { id: req.user.id },
  });

  res.render("vakkenleerling", {
    actSidebar: "vakken",
    user: req.user,
    meta: meta,
    courses: req?.classrooms,
  });
};
