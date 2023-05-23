/**
 * Our NavigationItem
 */

import typeorm from "typeorm";

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: "UserMeta",
  tableName: "user_meta",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    firstname: {
      type: "varchar",
    },
    lastname: {
      type: "varchar",
    },
    avatar: {
      type: "varchar",
      default: "/images/default.jpg",
    },
    birthday: {
      type: "date",
    },
    phone: {
      type: "varchar",
    },
    address: {
      type: "varchar",
    },
    nationality: {
      type: "varchar",
    },
  },
  relations: {
    user: {
      target: "User",
      type: "one-to-one",
      joinColumn: {
        name: "user_id",
      },
      onDelete: "CASCADE",
    },
  },
});
