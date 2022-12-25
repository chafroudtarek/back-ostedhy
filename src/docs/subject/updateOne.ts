export default {
  put: {
    tags: ["Subject operations"],
    description: "update subject",
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/id",
        },
        required: true,
        description: "Id of Subject to be updated",
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/SubjectInput",
          },
        },
      },
    },
    responses: {
      "200": {
        description: "Subject updated successfully",
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
