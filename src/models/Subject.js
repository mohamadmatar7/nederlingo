import typeorm from "typeorm";

const { EntitySchema } = typeorm;

export default new EntitySchema({
    name: "Subject",
    tableName: "subjects",
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
        users: {
            target: "User",
            type: "many-to-many",
            inverseSide: "subject",
            joinTable: {
                name: "users_subjects",
                joinColumn: {
                    name: "subject_id",
                    referencedColumnName: "id",
                },
                inverseJoinColumn: {
                    name: "user_id",
                    referencedColumnName: "id",
                },
            },
        },
        class: {
            target: "Class",
            type: "many-to-one",
            joinColumn: {
                name: "class_id",
                onDelete: "CASCADE",
            },
        },
    },
});
