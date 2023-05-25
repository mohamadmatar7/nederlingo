import DataSource from "../lib/DataSource.js";

export const file = async (req, res) => {
  const userRepo = DataSource.getRepository("User");
  const user = await userRepo.findOne({
    where: { id: req.user.id },
  });

  res.render("dossier-leerling", {
    actSidebar: "dossier",
    user: req.user,
    meta: user,
    courses: req?.classrooms,
  });
};