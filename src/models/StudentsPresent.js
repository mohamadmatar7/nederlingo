import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "StudentsPresent",
  tableName: "students_present",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
  },
  relations: {
    attendance: {
      target: "Attendance",
      type: "many-to-one",
      joinColumn: true,
      cascade: true,
      inverseSide: "students_present",
    },
    students: {
        target: "User",
        type: "many-to-one",
        joinColumn: true,
        cascade: true,
        inverseSide: "students_present"
      }
  },
});
