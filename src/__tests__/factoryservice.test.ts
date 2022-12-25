import { Test } from "./../database/models/test.model";
import { Teacher } from "./../database/models/Teacher.model";
import connection from "../utils/connection";
import { describe, expect } from "@jest/globals";
import { service } from "../services/factory";

beforeAll(() => {
  return connection.sync();
});
afterAll(() => {
  return connection.close();
});

let id = Math.floor(Math.random() * 1000000000).toString();

describe("Facotry service : endpoints", () => {
  test("getall with empty table should return an error", async () => {
    try {
      await service.getAll(Test);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  test("getone with wrong id should return an error", async () => {
    try {
      await service.getOne(Teacher, id);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it("updateOne  with invalid ID should return error message ", async () => {
    let data = new Teacher({
      firstname: "test",
    });
    try {
      await service.updateOne(Teacher, data, id);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it("deleteOne  with invalid ID should return error message ", async () => {
    let data = new Teacher({
      firstname: "test",
    });
    try {
      await service.deleteOne(Teacher, id);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
