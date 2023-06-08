import typeorm from "typeorm";

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: "Feedback",
  tableName: "feedback",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    content: {
      type: "varchar",
      nullable: true,
    },
  },
  relations: {
    user: { // Updated relation name to "user"
      target: "User",
      type: "many-to-one", // Changed type to "many-to-one"
      inverseSide: "feedback", // Updated inverse side property
      joinColumn: {
        name: "user_id",
        referencedColumnName: "id",
      },
    },
  },
});
