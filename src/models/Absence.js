import typeorm from "typeorm";
const { EntitySchema } = typeorm;

export default new EntitySchema({
    name: "Absence",
    tableName: "absence",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        reason: {
            type: "varchar"
        },
        date: {
            type: "date"
        }
    },
    relations: {
        user: {
            target: "User",
            type: "many-to-one",
            inverseSide: "absence",
            joinColumn: {
                name: "user_id",
            },
            onDelete: "CASCADE",
        }
    },
});