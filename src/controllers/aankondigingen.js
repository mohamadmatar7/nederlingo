import DataSource from "../lib/DataSource.js";

export const aankondigingen = async (req, res) => {
  const metaRepo = DataSource.getRepository("UserMeta");
  const meta = await metaRepo.findOne({
    where: { id: req.user.id },
  });

  res.render("aankondigingen", {
    actSidebar: "dossier",
    user: req.user,
    meta: meta,
    aankondigingen: req?.classrooms,
  });
};
