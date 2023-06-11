import DataSource from "../../lib/DataSource.js";

export const getAttendances = async (req, res, next) => {
  try {
    // get the repository
    const attendanceRepository = DataSource.getRepository("Attendance");

    res.status(200).json(
      await attendanceRepository.find({
        where: { id: null },
        relations: ["students_present", "classroom"],
      })
    );
  } catch (e) {
    next(e.message);
  }
};

export const getAttendance = async (req, res, next) => {
  try {
    // get the repository
    const attendanceRepository = DataSource.getRepository("Attendance");

    const attendances = await attendanceRepository.findOne({
      where: { id: req.params.id },
      relations: ["students_present", "classroom"],
    });
    if (!attendances) {
      return res.status(404).json("Attendance not found");
    }
    res.status(200).json(attendances);
  } catch (e) {
    next(e.message);
  }
};

export const deleteAttendance = async (req, res, next) => {
  try {
    const attendanceRepository = DataSource.getRepository("Attendance");
    const { id } = req.params;
    const attendanceId = req.body.id;

    const attendance = await attendanceRepository.findOne({
      where: { id: id },
    });
    if (!attendance) {
      return res.status(404).json("Attendance not found");
    }
    await attendanceRepository.remove(attendance);

    res.redirect("/alleklassen");
  } catch (e) {
    next(e);
  }
};

export const updateAttendance = async (req, res, next) => {
  try {
    const attendanceRepository = DataSource.getRepository("Attendance");
    const { id } = req.params;
    const attendanceId = req.body.id;

    const attendance = await attendanceRepository.findOne({
      where: { id: id },
    });
    if (!attendance) {
      return res.status(404).json("Attendance not found");
    }
    await attendanceRepository.save(attendance);

    res.redirect("/alleklassen");
  } catch (e) {
    next(e);
  }
};

export const postAttendance = async (req, res, next) => {
  try {
    const attendanceRepository = DataSource.getRepository("Attendance");
    const studentRepository = DataSource.getRepository("User");
    const studentPresentRepository =
      DataSource.getRepository("StudentsPresent");
    const classroomRepository = DataSource.getRepository("Classroom");
    const classroomId = req.body.classroom_id;
    const studentId = req.body.student_id;
    const date = req.body.date;
    const classroom = await classroomRepository.findOne({
      where: { id: classroomId },
    });
    const student = await studentRepository.findOne({
      where: { id: req.params.id },
    });
    let attendance = await attendanceRepository.findOne({
      where: {
        date: date,
        classroom: classroom,
      },
      relations: ["classroom", "students_present"],
    });
    if (!attendance) {
      attendance = await attendanceRepository.create({
        date: date,
        classroom: classroom,
      });
      await attendanceRepository.save(attendance);
    }

    const attendanceId = attendance.id;

    let studentPresent = await studentPresentRepository.findOne({
      where: {
        attendance: attendance,
        student: student,
      },
    });
    if (!studentPresent) {
      studentPresent = await studentPresentRepository.create({
        attendance: attendance,
        student: student,
      });
      await studentPresentRepository.save(studentPresent);
    } else {
      await studentPresentRepository.remove(studentPresent);
    }

    // await attendanceRepository.save(attendance);
    res.status(200).json(attendance);
  } catch (e) {
    next(e.message);
  }
};