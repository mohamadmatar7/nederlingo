import DataSource from "../lib/DataSource.js";

export const details = async (req, res) => {
  const metaRepo = DataSource.getRepository("UserMeta");
  const meta = await metaRepo.findOne({
    where: { id: req.user.id },
  });

  res.render("details", {
    actSidebar: "dossier",
    user: req.user,
    meta: meta,
    details: req?.classrooms,
  });
};
