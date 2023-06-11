import DataSource from "../lib/DataSource.js";

export const userStudent = async (req, res) => {
    const userRepo = DataSource.getRepository("User");
    const classRepo = DataSource.getRepository("Classroom");
    const user = await userRepo.findOne({
        where: { id: req.params.id },
        relations: ["meta", "classrooms", "feedback", "absences"],
    });

    const meta = user.meta;
    const classroom = user.classrooms;

    const allclassrooms = await classRepo.find();

    console.log(req.user);


    res.render("studentdetailsstudent", {
        actSidebar: "Klassen",
        user: req.user,
        meta: meta,
        classrooms: classroom,
        allclassrooms: allclassrooms,
        person: user,
    });
};

