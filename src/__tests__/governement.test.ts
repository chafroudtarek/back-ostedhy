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

describe("Governement endpoints", () => {
  it("request for get all governements return all governements with successful message", async () => {
    const data = await connection.query("SELECT * FROM governement");

    const response = await request(app)
      .get("/api/governement")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body.allGovernements.length).toEqual(data[0].length);
  });
  it("post one governement return the governement with successful message ", async () => {
    const response = await request(app)
      .post("/api/governement")
      .send({
        name: "test",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      oneGovernement: {
        id: response.body.oneGovernement.id,
        name: "test",
      },
      success: true,
    });
  });
  it("update one governement return the governement with successful message ", async () => {
    let lastobject: any = await connection.query(
      "select * from governement ORDER BY id DESC LIMIT 1"
    );

    const response = await request(app)
      .put(`/api/governement/${lastobject[0][0].id}`)
      .send({
        name: "testupdate",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      oneGovernement: {
        id: lastobject[0][0].id,
        name: "testupdate",
      },
      success: true,
    });
  });

  it("request for get  one governement should  return the governement with successful message ", async () => {
    let lastobject: any = await connection.query(
      "select * from governement ORDER BY id DESC LIMIT 1"
    );

    const response = await request(app)
      .get(`/api/governement/${lastobject[0][0].id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      oneGovernement: lastobject[0][0],
      success: true,
    });
  });

  it("request for delete  one governement should  return the deleted governement with successful message ", async () => {
    let lastobject: any = await connection.query(
      "select * from governement ORDER BY id DESC LIMIT 1"
    );

    const response = await request(app)
      .delete(`/api/governement/${lastobject[0][0].id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      oneGovernement: lastobject[0][0],
      success: true,
    });
  });
});
