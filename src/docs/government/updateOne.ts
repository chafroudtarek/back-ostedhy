export default {
  put: {
    tags: ["Government operations"],
    description: "update Government ",
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/id",
        },
        required: true,
        description: "Id of Government to be updated",
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/GovernmentInput",
          },
        },
      },
    },
    responses: {
      "200": {
        description: "Government updated successfully",
      },
      "404": {
        description: "Government not found",
      },
      "500": {
        description: "Server error",
      },
    },
  },
};
