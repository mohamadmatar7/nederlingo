export default {
    User: {
      properties: {
        id: { type: "number" },
        email: { type: "string" },
        password: { type: "string" },
        user_meta: {
          $ref: "#/components/schemas/UserMeta",
        },
        role: {
          $ref: "#/components/schemas/Role",
        },
        class: {
          $ref: "#/components/schemas/Class",
        },
        subjects: {
            $ref: "#/components/schemas/Subjects",
            },
      },
      example: {
        email: "john@email.com",
        password: "12345678",
        meta: {
          firstname: "John",
          lastname: "De Jong",
          username: "dejong_j",
          avatar: "photo.png"
        },
        role: {
          name: "Directeur",
        },
      },
    },
    UserMeta: {
      properties: {
        id: { type: "number" },
        firstname: { type: "string" },
        lastname: { type: "string" },
        username: { type: "string" },
        avatar: { type: "string" }
      },
    },
    Role: {
      properties: {
        id: { type: "number" },
        name: {
          type: "string",
          enum: ["Directeur", "Lesgever", "Leerling", "Begeleider"],
        },
      },
    },
    Class: {
        properties: {
          id: { type: "number" },
          label: { type: "string" },
        },
      },
    Subjects: {
        properties: {
            id: { type: "number" },
            name: { type: "string" },
        },
    },
  };