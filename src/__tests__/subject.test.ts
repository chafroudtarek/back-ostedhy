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

describe("Subject endpoints", () => {
  it("request for get all subjectes return all subjects with successful message", async () => {
    const data = await connection.query("SELECT * FROM subject");

    const response = await request(app)
      .get("/api/subject")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body.allSubjects.length).toEqual(data[0].length);
  });
  it("post one subject return the subject with successful message ", async () => {
    const response = await request(app)
      .post("/api/subject")
      .send({
        name: "test",
        slug: "test",
        thumbnail: "test",
        price: 45,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      oneSubject: {
        id: response.body.oneSubject.id,
        name: "test",
        slug: "test",
        thumbnail: "test",
        price: 45,
      },
      success: true,
    });
  });
  it("update one subject return the subject with successful message ", async () => {
    let lastobject: any = await connection.query(
      "select * from subject ORDER BY id DESC LIMIT 1"
    );

    const response = await request(app)
      .put(`/api/subject/${lastobject[0][0].id}`)
      .send({
        name: "testupdate",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      oneSubject: {
        id: lastobject[0][0].id,
        name: "testupdate",
        slug: "test",
        thumbnail: "test",
        classId: null,
        teacherId: null,
        price: 45,
      },
      success: true,
    });
  });

  it("request for get  one subject should  return the subject with successful message ", async () => {
    let lastobject: any = await connection.query(
      "select * from subject ORDER BY id DESC LIMIT 1"
    );

    console.log("dsdsd", lastobject);

    const response = await request(app)
      .get(`/api/subject/${lastobject[0][0].id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      oneSubject: lastobject[0][0],
      success: true,
    });
  });

  it("request for delete  one subject should  return the deleted subject with successful message ", async () => {
    let lastobject: any = await connection.query(
      "select * from subject ORDER BY id DESC LIMIT 1"
    );

    const response = await request(app)
      .delete(`/api/subject/${lastobject[0][0].id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      oneSubject: lastobject[0][0],
      success: true,
    });
  });
});
