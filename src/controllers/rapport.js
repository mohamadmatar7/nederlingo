import DataSource from "../lib/DataSource.js";

export const rapport = async (req, res) => {
  const metaRepo = DataSource.getRepository("UserMeta");
  const meta = await metaRepo.findOne({
    where: { id: req.user.id },
  });

  res.render("rapport", {
    actSidebar: "dossier",
    user: req.user,
    meta: meta,
    rapport: req?.classrooms,
  });
};
