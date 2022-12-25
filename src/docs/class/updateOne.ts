export default {
  put: {
    tags: ["Class operations"],
    description: " update Class ",
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/id",
        },
        required: true,
        description: "Id of Class to be updated",
      },
    ],
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
      "200": {
        description: "Class updated successfully",
      },
      "404": {
        description: "Class not found",
      },
      "500": {
        description: "Server error",
      },
    },
  },
};
