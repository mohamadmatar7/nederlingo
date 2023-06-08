import DataSource from "../lib/DataSource.js";

export const nederlands_algemeen = async (req, res) => {
  const metaRepo = DataSource.getRepository("UserMeta");
  const meta = await metaRepo.findOne({
    where: { id: req.user.id },
  });

  res.render("nederlands_algemeen", {
    actSidebar: "vakken",
    user: req.user,
    meta: meta,
    nederlands_algemeen: req?.classrooms,
  });
};
