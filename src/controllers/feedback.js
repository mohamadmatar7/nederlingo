import DataSource from "../lib/DataSource.js";

export const feedback = async (req, res) => {
  const metaRepo = DataSource.getRepository("UserMeta");
  const meta = await metaRepo.findOne({
    where: { id: req.user.id },
  });

  res.render("feedback", {
    actSidebar: "feedback",
    user: req.user,
    meta: meta,
    feedback: req?.classrooms,
  });
};
