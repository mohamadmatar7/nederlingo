import subjectResponse from "../responses/subjects.js";

export default {
  "/api/subjects": {
    summary: "GET with subjects",
    description: "Get all subjects in the database",
    get: {
      tags: ["Subjects"],
      summary: "Get all subjects",
      responses: subjectResponse,
    },
    post: {
        tags: ["Subjects"],
        summary: "Create a new subject",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Subjects",
              },
            },
          },
        },
        responses: subjectResponse,
      },
  },
  "/api/subjects/{id}": {
    summary: "Get one subject with given id",
    description: "Get one subject with given id",
    get: {
      tags: ["Subjects"],
      summary: "Get one subject with given id",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
            minimum: 1,
          },
          description: "ID of the subject to get",
        },
      ],
      responses: subjectResponse,
    },
    delete: {
        tags: ["Subjects"],
        summary: "Delete one subject with given id",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "integer",
              minimum: 1,
            },
            description: "ID of the subject to delete",
          },
        ],
        responses: subjectResponse,
      },
  },
};