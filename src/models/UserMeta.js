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
      default: "/images/avatars/default.jpg",
    },
    birthday: {
      type: "date",
    },
    birthplace: {
      type: "varchar",
    },
    parent: {
      type: "varchar",
    },
    family:{
      type: "varchar",
    },
    bankpreference: {
      type: "varchar",
    },
    transport: {
      type: "varchar",
    },
    gender: {
      type: "varchar",
    },
    religion: {
      type: "varchar",
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
