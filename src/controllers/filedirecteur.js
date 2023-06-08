import DataSource from "../lib/DataSource.js";

export const fileD = async (req, res) => {
  const userRepo = DataSource.getRepository("User");
  const user = await userRepo.findOne({
    where: { id: req.user.id },
  });
  const metaRepo = DataSource.getRepository("UserMeta");
  const meta = await metaRepo.findOne({
    where: { id: req.user.id },
  });

  res.render("dossier-directeur", {
    actSidebar: "dossier",
    user: req.user,
    meta: meta,
    courses: req?.classrooms,
  });
};