import typeorm from "typeorm";

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: "Subject",
  tableName: "subject",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
  },
  relations: {
    /* users can have many subjects */
    // users: {
    //     target: "User",
    //     type: "many-to-many",
    //     inverseSide: "subject",
    //     joinTable: {
    //         name: "users_subjects",
    //         joinColumn: {
    //             name: "subject_id",
    //             referencedColumnName: "id",
    //         },
    //         inverseJoinColumn: {
    //             name: "user_id",
    //             referencedColumnName: "id",
    //         },
    //     },
    // },
    classrooms: {
      target: "Classroom",
      type: "many-to-many",
      cascade: true,
      inverseSide: "subject",
      joinTable: {
        name: "subjects_classes",
        joinColumn: {
          name: "subject_id",
          referencedColumnName: "id",
        },
        inverseJoinColumn: {
          name: "class_id",
          referencedColumnName: "id",
        },
      },
    },
  },
});
