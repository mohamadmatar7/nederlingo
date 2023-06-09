import typeorm from "typeorm";

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    email: {
      type: "varchar",
    },
    password: {
      type: "varchar",
    },
  },
  relations: {
    meta: {
      target: "UserMeta",
      type: "one-to-one",
      cascade: true,
      inverseSide: "user",
    },
    role: {
      target: "Role",
      type: "many-to-one",
      joinColumn: true,
      inverseSide: "users",
    },
    classrooms: {
      target: "Classroom",
      type: "many-to-many",
      cascade: true,
      inverseSide: "users",
      joinTable: {
        name: "users_classes",
        joinColumn: {
          name: "user_id",
          referencedColumnName: "id",
        },
        inverseJoinColumn: {
          name: "class_id",
          referencedColumnName: "id",
        },
      },
    },
    feedback: { 
      target: "Feedback",
      type: "one-to-many", 
      inverseSide: "user",
      cascade: true,
    },
    absences: {
      target: "Absence",
      type: "one-to-many",
      cascade: true,
      inverseSide: "user",
  },
  students_present: {
    target: "StudentsPresent",
    type: "one-to-many",
    inverseSide: "user",
},
  },
});
