export default {
  get: {
    tags: ["Class operations"],
    description: "Get a Class",
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/id",
        },
        required: true,
        description: "A single Class id",
      },
    ],
    responses: {
      "200": {
        description: "Class is obtained",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Class",
            },
          },
        },
      },
      "404": {
        description: "Class is not found",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
              example: {
                message: "We can't find the Class",
                internal_code: "Invalid id",
              },
            },
          },
        },
      },
    },
  },
};
