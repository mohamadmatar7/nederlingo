import DataSource from "../lib/DataSource.js";

export const courses = async (req, res) => {
  const metaRepo = DataSource.getRepository("UserMeta");
  const meta = await metaRepo.findOne({
    where: { id: req.user.id },
  });
  console.log(req?.classrooms);
  res.render("vakkenleerling", {
    user: req.user,
    meta: meta,
    courses: req?.classrooms,
  });
};
