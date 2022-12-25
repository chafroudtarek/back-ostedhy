export default {
  post: {
    tags: ["Auth operations"],
    description: "user register",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              firstname: {
                type: "string",
              },
              lastname: {
                type: "string",
              },
              email: {
                type: "string",
              },
              password: {
                type: "string",
              },
              phone: {
                type: "string",
              },
            },
          },
        },
      },
    },
    responses: {
      "201": {
        description: "Register successfully ",
      },
      "500": {
        description: "Server error",
      },
    },
  },
};
