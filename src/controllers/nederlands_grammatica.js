import DataSource from "../lib/DataSource.js";

export const nederlands_grammatica = async (req, res) => {
  const metaRepo = DataSource.getRepository("UserMeta");
  const meta = await metaRepo.findOne({
    where: { id: req.user.id },
  });

  res.render("nederlands_grammatica", {
    actSidebar: "vakken",
    user: req.user,
    meta: meta,
    nederlands_grammatica: req?.classrooms,
  });
};
