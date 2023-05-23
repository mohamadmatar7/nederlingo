import classResponse from "../responses/classes.js";

export default {
  "/api/classes": {
    summary: "GET with classes",
    description: "Get all classes in the database",
    get: {
      tags: ["Classes"],
      summary: "Get all classes",
      responses: classResponse,
    },
  },
  "/api/classes/{id}": {
    summary: "Get one class with given id",
    description: "Get one class with given id",
    get: {
      tags: ["Classes"],
      summary: "Get one class with given id",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
            minimum: 1,
          },
          description: "ID of the class to get",
        },
      ],
      responses: classResponse,
    },
    put: {
        tags: ["Classes"],
        summary: "Update one class with given id",
        parameters: [
            {
                in: "path",
                name: "id",
                required: true,
                schema: {
                    type: "integer",
                    minimum: 1,
                },
                description: "ID of the class to update",
            },
        ],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Class",
                    },
                },
            },
        },
        responses: classResponse,
    },
    delete: {
        tags: ["Classes"],
        summary: "Delete one class with given id",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "integer",
              minimum: 1,
            },
            description: "ID of the class to delete",
          },
        ],
        responses: classResponse,
      },
  },
};