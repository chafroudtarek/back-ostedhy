export default {
  get: {
    tags: ["Subject operations"],
    description: "Get a Subject",
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/id",
        },
        required: true,
        description: "A single Subject id",
      },
    ],
    responses: {
      "200": {
        description: "Subject is obtained",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Subject",
            },
          },
        },
      },
      "404": {
        description: "Subject is not found",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
              example: {
                message: "We can't find the Subject",
                internal_code: "Invalid id",
              },
            },
          },
        },
      },
    },
  },
};
