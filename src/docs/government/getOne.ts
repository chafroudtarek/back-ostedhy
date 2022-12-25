export default {
  get: {
    tags: ["Government operations"],
    description: "Get a Government",
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/id",
        },
        required: true,
        description: "A single government id",
      },
    ],
    responses: {
      "200": {
        description: "Government is obtained",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Government",
            },
          },
        },
      },
      "404": {
        description: "Government is not found",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
              example: {
                message: "We can't find the Government",
                internal_code: "Invalid id",
              },
            },
          },
        },
      },
    },
  },
};
