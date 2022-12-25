export default {
  post: {
    tags: ["Government operations"],
    description: "Create Government",

    parameters: [],
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
      "201": {
        description: "Government created successfully",
      },
      "500": {
        description: "Server error",
      },
    },
  },
};
