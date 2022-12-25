export default {
  post: {
    tags: ["Class operations"],
    description: "Create Class",

    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ClassInput",
          },
        },
      },
    },
    responses: {
      "201": {
        description: "Class created successfully",
      },
      "500": {
        description: "Server error",
      },
    },
  },
};
