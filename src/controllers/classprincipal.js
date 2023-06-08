import DataSource from "../lib/DataSource.js";

export const classP = async (req, res) => {
    const metaRepo = DataSource.getRepository("UserMeta");
    const meta = await metaRepo.findOne({
      where: { id: req.user.id },
    });
  
    const classRepo = DataSource.getRepository("Classroom");
    const classroomWithTeacher = await classRepo.findOne({
      where: { 
        id: req.params.id, 
        users: {
          role: {
            label: "Lesgever"
          }
        }
      }, 
      relations: ["users", "users.meta", "users.role"],
    });

    const classroomWithStudent = await classRepo.findOne({
      where: { 
        id: req.params.id, 
        users: {
          role: {
            label: "Leerling"
          }
        }
      }, 
      relations: ["users", "users.meta", "users.role"],
    });
  
    res.render("klasdetailsdirecteur", {
      actSidebar: "Klassen",
      user: req.user,
      meta: meta,
      classroomTeacher: classroomWithTeacher, 
      classroomStudents: classroomWithStudent 
    });
  };
  
