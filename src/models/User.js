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
    // absence: {
    //   target: "Absence",
    //   type: "one -to-one",
    //   cascade: true,
    //   inverseSide: "user",
    // },
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
      type: "many-to-many",
      cascade: true,
      inverseSide: "users",
      joinTable: {
        name: "users_feedbacks",
        joinColumn: {
          name: "user_id",
          referencedColumnName: "id",
        },
        inverseJoinColumn: {
          name: "feedback_id",
          referencedColumnName: "id",
        },
      },
    },

    // subjects: {
    //   target: "Subject",
    //   type: "many-to-many",
    //   cascade: true,
    //   inverseSide: "users",
    //   joinTable: {
    //     name: "users_subjects",
    //     joinColumn: {
    //       name: "user_id",
    //       referencedColumnName: "id",
    //     },
    //     inverseJoinColumn: {
    //       name: "subject_id",
    //       referencedColumnName: "id",
    //     },
    //   },
    // },
  },
});
