import DataSource from "../lib/DataSource.js";

export const dashboard = async (req, res) => {
  const userRepo = DataSource.getRepository("User");
  const user = await userRepo.findOne({
    where: { id: req.user.id },
  });

  res.render("home", {
    actSidebar: "overzicht",
    user: req.user,
    meta: user,
    courses: req?.classrooms,
  });
};
