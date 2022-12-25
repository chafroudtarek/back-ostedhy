export default {
  get: {
    tags: ["Auth operations"],
    description: "Get refres Token",
    parameters: [],
    responses: {
      "200": {
        description: "refresh token were obtained",
        content: {
          "application/json": {},
        },
      },
    },
  },
};
