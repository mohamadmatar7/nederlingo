import typeorm from "typeorm";

const { EntitySchema } = typeorm;

export default new EntitySchema({
    name: "Class",
    tableName: "classes",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        label: {
            type: "varchar",
        }
    },
    relations: {
        /** users can have many classes */
        users: {
            target: "User",
            type: "many-to-many",
            inverseSide: "class",
            joinTable: {
                name: "users_classes",
                joinColumn: {
                    name: "class_id",
                    referencedColumnName: "id",
                },
                inverseJoinColumn: {
                    name: "user_id",
                    referencedColumnName: "id",
                },
            },
        },
        subjects: {
            target: "Subject",
            type: "one-to-many",
            inverseSide: "class",
            cascade: true,
        },
    },
});