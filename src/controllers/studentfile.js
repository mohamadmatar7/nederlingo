import DataSource from "../lib/DataSource.js";

export const userP = async (req, res) => {
    const userRepo = DataSource.getRepository("User");
    const user = await userRepo.findOne({
        where: { id: req.params.id },
        relations: ["meta", "classrooms", "feedback",],
    });

    const meta = user.meta;

    const classRepo = DataSource.getRepository("Classroom");
    const classroom = await classRepo.findOne({
        where: { id: req.params.id },
        relations: ["users", "users.meta"],
    });

    res.render("studentdetaildirecteur", {
        actSidebar: "Klassen",
        user: req.user,
        meta: meta,
        classrooms: classroom
    });
};

