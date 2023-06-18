import DataSource from "../lib/DataSource.js";

export const userM = async (req, res) => {
    const userRepo = DataSource.getRepository("User");
    const classRepo = DataSource.getRepository("Classroom");
    const user = await userRepo.findOne({
        where: { id: req.params.id },
        relations: ["meta", "classrooms", "feedback", "absences"],
    });

    const meta = user.meta;
    const classroom = user.classrooms;
    const absences = user.absences

    const allclassrooms = await classRepo.find();

    console.log(req.user);


    res.render("student_details_begeleider", {
        actSidebar: "Klassen",
        user: req.user,
        meta: meta,
        classrooms: classroom,
        allclassrooms: allclassrooms,
        person: user,
        absences: absences
    });
};

