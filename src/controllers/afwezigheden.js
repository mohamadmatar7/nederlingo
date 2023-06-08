import DataSource from "../lib/DataSource.js";

export const afwezigheden = async (req, res) => {
  const metaRepo = DataSource.getRepository("UserMeta");
  const meta = await metaRepo.findOne({
    where: { id: req.user.id },
  });

  res.render("afwezigheden", {
    actSidebar: "afwezigheden",
    user: req.user,
    meta: meta,
    afwezigheden: req?.classrooms,
  });
};
