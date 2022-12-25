export default {
  get: {
    tags: ["Chapter operations"],
    description: "Get a Chapter",
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/id",
        },
        required: true,
        description: "A single Chapter id",
      },
    ],
    responses: {
      "200": {
        description: "Chapter is obtained",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Chapter",
            },
          },
        },
      },
      "404": {
        description: "Chapter is not found",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
              example: {
                message: "We can't find the Chapter",
                internal_code: "Invalid id",
              },
            },
          },
        },
      },
    },
  },
};
