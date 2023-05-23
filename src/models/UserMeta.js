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
    birthplace: {
      type: "varchar",
      nullable: true
    },
    parent: {
      type: "varchar",
      nullable: true
    },
    family:{
      type: "varchar",
      nullable: true
    },
    bankpreference: {
      type: "varchar",
      nullable: true
    },
    transport: {
      type: "varchar",
      nullable: true
    },
    gender: {
      type: "varchar",
      nullable: true
    },
    religion: {
      type: "varchar",
      nullable: true
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
