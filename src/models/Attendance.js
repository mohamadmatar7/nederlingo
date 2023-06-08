import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Attendance",
  tableName: "attendance",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    date: {
      type: "date",
    },
  },
  relations: {
    classroom: {
      target: "Classroom",
      type: "many-to-one",
      joinColumn: true,
      inverseSide: "attendance"
    },
    students_present: {
      target: "StudentsPresent",
      type: "one-to-many",
      inverseSide: "attendance",
  },
  },
});
