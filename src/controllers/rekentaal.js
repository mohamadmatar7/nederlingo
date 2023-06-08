import DataSource from "../lib/DataSource.js";

export const rekentaal = async (req, res) => {
  const metaRepo = DataSource.getRepository("UserMeta");
  const meta = await metaRepo.findOne({
    where: { id: req.user.id },
  });

  res.render("rekentaal", {
    actSidebar: "vakken",
    user: req.user,
    meta: meta,
    rekentaal: req?.classrooms,
  });
};
