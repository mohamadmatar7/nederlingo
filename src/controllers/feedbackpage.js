import DataSource from "../lib/DataSource.js";

export const feedbackR = async (req, res) => {
  const userRepo = DataSource.getRepository("User");
  console.log(req.user.id);
  const user = await userRepo.findOne({
    where: { id: req.user.id },
    relations: ["meta", "feedback"],
  });

  console.log(user);
  const metaRepo = DataSource.getRepository("UserMeta");
  const meta = await metaRepo.findOne({
    where: { id: req.user.id },
  });

  console.log(meta);
  const feedbackRepo = DataSource.getRepository("Feedback");
  const feedback = await feedbackRepo.findOne({
    where: { id: req.user.id },
  });
  const feed = user.feedback;
  console.log(feed)

  res.render("feedback", {
    actSidebar: "feedback",
    user: req.user,
    meta: meta,
    feedback: feed
  });
};