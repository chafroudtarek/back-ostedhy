import connection from "../utils/connection";
import app from "../app";
import request from "supertest";
import { describe, expect } from "@jest/globals";
import token from "../utils/gTokenForTest";

beforeAll(() => {
  return connection.sync();
});
afterAll(() => {
  return connection.close();
});

describe("Class endpoints", () => {
  it("request for get all classes return all classes with successful message", async () => {
    const data = await connection.query("SELECT * FROM CLASSE");

    const response = await request(app)
      .get("/api/class")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body.allClasses.length).toEqual(data[0].length);
  });
  it("post one class return the class with successful message ", async () => {
    const response = await request(app)
      .post("/api/class")
      .send({
        name: "test",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      oneClass: {
        id: response.body.oneClass.id,
        name: "test",
      },
      success: true,
    });
  });
  it("update one class return the class with successful message ", async () => {
    let lastobject: any = await connection.query(
      "select * from classe ORDER BY id DESC LIMIT 1"
    );

    const response = await request(app)
      .put(`/api/class/${lastobject[0][0].id}`)
      .send({
        name: "testupdate",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      oneClass: {
        id: lastobject[0][0].id,
        name: "testupdate",
        teacherId: null,
      },
      success: true,
    });
  });

  it("request for get  one class should  return the class with successful message ", async () => {
    let lastobject: any = await connection.query(
      "select * from classe ORDER BY id DESC LIMIT 1"
    );

    const response = await request(app)
      .get(`/api/class/${lastobject[0][0].id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      oneClass: lastobject[0][0],
      success: true,
    });
  });

  it("request for delete  one class should  return the deleted class with successful message ", async () => {
    let lastobject: any = await connection.query(
      "select * from classe ORDER BY id DESC LIMIT 1"
    );

    const response = await request(app)
      .delete(`/api/class/${lastobject[0][0].id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      oneClass: lastobject[0][0],
      success: true,
    });
  });
});
