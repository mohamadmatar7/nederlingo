import DataSource from "../lib/DataSource.js";

export const classP = async (req, res) => {
    const metaRepo = DataSource.getRepository("UserMeta");
    const meta = await metaRepo.findOne({
      where: { id: req.user.id },
    });
  
    const classRepo = DataSource.getRepository("Classroom");
    const classroom = await classRepo.findOne({
      where: { id: req.params.id },
      relations: ["users", "users.meta"],
    });
    console.log(classroom);
  
    res.render("klasdetailsdirecteur", {
      actSidebar: "Klassen",
      user: req.user,
      meta: meta,
      classroom: classroom,
    });
  };
  
