import DataSource from "../../lib/DataSource.js";

export const postAttendance = async (req, res, next) => {
  try {
    const { date } = req.body;

    const attendanceRepository = DataSource.getRepository("Attendance");
    const userRepository = DataSource.getRepository("User");

    const user = await userRepository.findOne({ where: { id: req.params.id } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingAttendance = await attendanceRepository.findOne({
      where: {
        date: date || new Date(),
      },
      relations: ["students_present"],
    });

    if (existingAttendance) {
      // Check if user is already marked present
      const isPresent = existingAttendance.students_present.some(
        (student) => student.id === user.id
      );
      if (isPresent) {
        return res
          .status(400)
          .json({ error: "Attendance already posted for this user on this day" });
      }

      // Add the user to the existing attendance
      existingAttendance.students_present.push(user);

      await attendanceRepository.save(existingAttendance);

      return res.status(200).json({ message: "Attendance updated successfully" });
    }

    const attendance = attendanceRepository.create({
      date: date || new Date(),
      students_present: [user],
    });

    await attendanceRepository.save(attendance);

    return res.status(200).json({ message: "Attendance posted successfully" });
  } catch (error) {
    console.error("Error posting attendance:", error);
    next(error);
  }
};

