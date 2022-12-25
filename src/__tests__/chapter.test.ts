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

describe("Chapter endpoints", () => {
  it("request for get all Chapter return all Chapters with successful message", async () => {
    const data = await connection.query("SELECT * FROM CHAPTER");

    const response = await request(app)
      .get("/api/chapter")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body.allChapters.length).toEqual(data[0].length);
  });
  it("post one Chapter return the chapter with successful message ", async () => {
    const response = await request(app)
      .post("/api/chapter")
      .send({
        name: "test",
        slug: "test",
        thumbnail: "test",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      oneChapter: {
        id: response.body.oneChapter.id,
        name: "test",
        slug: "test",
        thumbnail: "test",
      },
      success: true,
    });
  });
  it("update one Chapter return the chapter with successful message ", async () => {
    let lastobject: any = await connection.query(
      "select * from CHAPTER ORDER BY id DESC LIMIT 1"
    );

    const response = await request(app)
      .put(`/api/chapter/${lastobject[0][0].id}`)
      .send({
        name: "testupdate",
        slug: "testupdate",
        thumbnail: "testupdate",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      oneChapter: {
        id: lastobject[0][0].id,
        name: "testupdate",
        slug: "testupdate",
        thumbnail: "testupdate",
        price: null,
        shortDescription: null,
        longDescription: null,
        approved: null,
        status: null,
        subjectId: null,
      },
      success: true,
    });
  });

  it("request for get  one Chapter should  return the chapter with successful message ", async () => {
    let lastobject: any = await connection.query(
      "select * from CHAPTER ORDER BY id DESC LIMIT 1"
    );

    const response = await request(app)
      .get(`/api/chapter/${lastobject[0][0].id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      oneChapter: lastobject[0][0],
      success: true,
    });
  });

  it("request for approve  one Chapter should  return the approved chapter with successful message ", async () => {
    let lastobject: any = await connection.query(
      "select * from CHAPTER ORDER BY id DESC LIMIT 1"
    );

    const response = await request(app)
      .put(`/api/chapter/approve/${lastobject[0][0].id}`)
      .set("Authorization", `Bearer ${token}`);
    let approvedChapter: any = await connection.query(
      "select * from CHAPTER ORDER BY id DESC LIMIT 1"
    );
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      oneChapter: approvedChapter[0][0],
      success: true,
    });
  });

  it("request for disapprove  one Chapter should  return the disapproved chapter with successful message ", async () => {
    let lastobject: any = await connection.query(
      "select * from CHAPTER ORDER BY id DESC LIMIT 1"
    );

    const response = await request(app)
      .put(`/api/chapter/disapprove/${lastobject[0][0].id}`)
      .set("Authorization", `Bearer ${token}`);

    let disapprovedChapter: any = await connection.query(
      "select * from CHAPTER ORDER BY id DESC LIMIT 1"
    );
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      oneChapter: disapprovedChapter[0][0],
      success: true,
    });
  });
  it("request for delete  one Chapter should  return the deleted chapter with successful message ", async () => {
    let lastobject: any = await connection.query(
      "select * from CHAPTER ORDER BY id DESC LIMIT 1"
    );

    const response = await request(app)
      .delete(`/api/chapter/${lastobject[0][0].id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      oneChapter: lastobject[0][0],
      success: true,
    });
  });
});
