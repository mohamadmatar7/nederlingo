import userResponse from "../responses/users.js";

export default {
  "/api/users": {
    summary: "GET with users",
    description: "Get all users in the database",
    get: {
      tags: ["Users"],
      summary: "Get all users",
      responses: userResponse,
    },
  },
  "/api/users/{id}": {
    summary: "Get one user with given id",
    description: "Get one user with given id",
    get: {
      tags: ["Users"],
      summary: "Get one user with given id",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
            minimum: 1,
          },
          description: "ID of the user to get",
        },
      ],
      responses: userResponse,
    },
    put: {
        tags: ["Users"],
        summary: "Update one user with given id",
        parameters: [
            {
                in: "path",
                name: "id",
                required: true,
                schema: {
                    type: "integer",
                    minimum: 1,
                },
                description: "ID of the user to update",
            },
        ],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/User",
                    },
                },
            },
        },
        responses: userResponse,
    },
    delete: {
        tags: ["Users"],
        summary: "Delete one user with given id",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "integer",
              minimum: 1,
            },
            description: "ID of the user to delete",
          },
        ],
        responses: userResponse,
      },
  },
};