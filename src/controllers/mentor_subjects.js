import DataSource from "../lib/DataSource.js";

export const subjectsM = async (req, res) => {
  const metaRepo = DataSource.getRepository("UserMeta");
  const meta = await metaRepo.findOne({
    where: { id: req.user.id },
  });

  res.render("begeleider_vakken", {
    actSidebar: "vakken",
    user: req.user,
    meta: meta,
    courses: req?.classrooms,
  });
};
