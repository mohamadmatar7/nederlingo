// import typeorm from "typeorm";

// const { EntitySchema } = typeorm;

// export default new EntitySchema({
//     name: "Absence",
//     tableName: "absence",
//     columns: {
//         id: {
//             primary: true,
//             type: "int",
//             generated: true,
//         },
//         date: {
//             type: "date",
//         },
//         reason: {
//             type: "varchar",
//         },
//         // user: {
//         //     type: "int",
//         // },
//     },
//     relations: {
//         user: {
//             target: "User",
//             type: "one-to-one",
//             joinColumn: true,
//             cascade: true,
//             onDelete: "CASCADE",
//         },
//     },
// });