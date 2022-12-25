export default {
  post: {
    tags: ["Auth operations"],
    description: "user login",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: {
                type: "string",
                example: "admin@admin.com",
              },
              phone: {
                type: "string",
              },
              password: {
                type: "string",
                example: "adminadmin",
              },
            },
          },
        },
      },
    },
    responses: {
      "201": {
        description: "Login successfully ",
      },
      "500": {
        description: "Server error",
      },
    },
  },
};
