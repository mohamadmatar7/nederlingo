import DataSource from "../../lib/DataSource.js";

export const getSubjects = async (req, res, next) => {
  try {
    const userid = req.user.id;

    const userRepo = DataSource.getRepository("User");
    const user = await userRepo.findOne({
      where: {
        id: userid,
      },
      relations: ["classrooms"],
    });
    const classroomid = user.classrooms[0]?.id;

    const classRepo = DataSource.getRepository("Classroom");
    const classroom = await classRepo.findOne({
      where: {
        id: classroomid,
      },
      relations: ["subjects"],
    });

    // get the repository
    const subjectRepository = DataSource.getRepository("Subject");
    req.classrooms = classroom.subjects;
    next();
  } catch (e) {
    next(e.message);
  }
};

export const getSubjectsP = async (req, res, next) => {
  try {
    // get the repository
    const subjectRepository = DataSource.getRepository("Subject");

    req.classrooms = await subjectRepository.find();

    next();
  } catch (e) {
    next(e.message);
  }
};


export const getSubject = async (req, res, next) => {
  try {
    // get the repository
    const subjectRepository = DataSource.getRepository("Subject");

      const subject= await subjectRepository.findOne({
        where: { id: req.params.id },
        relations: ["classrooms", "classrooms.users"],
      })
    req.subjects = subject;
    next();
  } catch (e) {
    next(e.message);
  }
};

export const deleteSubject = async (req, res, next) => {
  try {
    const subjectRepository = DataSource.getRepository("Subject");
    // get the user by id
    const { id } = req.params;
    const Subject = await subjectRepository.findOneBy({ id: id });
    await subjectRepository.remove(Subject);
    res.status(200).json(`the subject with id:${id} has been deleted`);
  } catch (e) {
    next(e.message);
  }
};

export const postSubject = async (req, res, next) => {
  try {
    const subjectRepository = DataSource.getRepository("Subject");
    const subject = await subjectRepository.create(req.body);
    await subjectRepository.save(subject);
    res.redirect("/allevakken")
  } catch (e) {
    next(e.message);
  }
};


export const AddSubjectToClass = async (req, res, next) => {
  try {
    const subjectRepository = DataSource.getRepository("Subject");
    const classroomRepository = DataSource.getRepository("Classroom");
    const { subjectId, classId } = req.body;

    const subject = await subjectRepository.findOneBy({ id: subjectId });
    const classroom = await classroomRepository.findOne({
      where: { id: classId },
      relations: ["subjects"],
    });
    if (!subject || !classroom) throw new Error("Subject or classroom not found");
    if (classroom.subjects) {
      classroom.subjects.push(subject);
    } else {
      classroom.subjects = [subject];
    }
    await classroomRepository.save(classroom);
    return res.status(200).json(classroom);
  } catch (e) {
    next(e);
  }
};
