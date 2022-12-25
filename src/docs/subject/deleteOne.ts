export default {
  delete: {
    tags: ["Subject operations"],
    description: "Deleting a Subject",
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/id",
        },
        required: true,
        description: "Deleting an exist Subject",
      },
    ],
    responses: {
      "200": {
        description: "Subject deleted successfully",
      },
      "404": {
        description: "Subject not found",
      },
      "500": {
        description: "Server error",
      },
    },
  },
};
