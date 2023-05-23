import typeorm from "typeorm";

const { EntitySchema } = typeorm;

export default new EntitySchema({
    name: "Feedback",
    tableName: "feedbacks",
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
            users: {
            target: "User",
            type: "many-to-many",
            inverseSide: "feedback",
            joinTable: {
                name: "users_feedbacks",
                joinColumn: {
                    name: "feedback_id",
                    referencedColumnName: "id",
                },
                inverseJoinColumn: {
                    name: "user_id",
                    referencedColumnName: "id",
                },
            },
        },
    },
});


