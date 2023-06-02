import DataSource from "../lib/DataSource.js";

export const userP = async (req, res) => {
    const userRepo = DataSource.getRepository("User");
    const classRepo = DataSource.getRepository("Classroom");
    const user = await userRepo.findOne({
        where: { id: req.params.id },
        relations: ["meta", "classrooms", "feedback",],
    });

    const meta = user.meta;
    const classroom = user.classrooms
    const test = user.id

    const allclassrooms = await classRepo.find();


    res.render("studentdetaildirecteur", {
        actSidebar: "Klassen",
        user: req.user,
        meta: meta,
        classrooms: classroom,
        allclassrooms: allclassrooms,
        person: user,
    });
};

