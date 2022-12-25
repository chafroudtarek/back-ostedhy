export default {
  post: {
    tags: ["Auth operations"],
    description: "Reset password",
    parameters: [
      {
        name: "code",
        in: "query",
        schema: {
          email: {
            type: "string",
          },
        },
      },
      {
        name: "userId",
        in: "query",
        schema: {
          email: {
            type: "string",
          },
        },
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              newpassword: {
                type: "string",
                description: "new password",
              },
            },
          },
        },
      },
    },
    responses: {
      "200": {
        description: "reset password successfully",
        content: {
          "application/json": {},
        },
      },
      "404": {
        description: "THERE'S AN ERROR CHECK AGAIN",
        content: {
          "application/json": {},
        },
      },
    },
  },
};
