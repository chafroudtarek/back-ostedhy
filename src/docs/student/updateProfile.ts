export default {
  put: {
    tags: ["Students operations"],
    description: "update profile",
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/id",
        },
        required: true,
        description: "Id of user to be updated",
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/StudentInput",
          },
        },
      },
    },
    responses: {
      "201": {
        description: "Chapter created successfully",
      },
      "500": {
        description: "Server error",
      },
    },
  },
};
