import nock from "nock";
import { usersHandler } from ".";
import { User } from "../../types";

const apiUrl = process.env.API_URL;

const getUsersResponse = [
  {
    id: "test-id",
    name: "test-name",
    email: "test@test.com",
  },
];

describe("Users", () => {
  describe("getUsers", () => {
    it("should return data on successful response", async () => {
      nock(apiUrl).get("/users").reply(200, getUsersResponse);

      const result = await usersHandler.getUsers();

      expect(result).toEqual(getUsersResponse);
    });

    it("should throw when returning a server error", async () => {
      nock(apiUrl).get("/").reply(500);

      const error = new Error("API: Error getting users");

      await expect(async () => await usersHandler.getUsers()).rejects.toThrow(
        error
      );
    });
  });

  describe("getUser", () => {
    it("should return data for user when found", async () => {
      const id = "test-id";
      nock(apiUrl).get(`/users/${id}`).reply(200, getUsersResponse[0]);

      const result = await usersHandler.getUser(id);

      expect(result).toEqual(getUsersResponse[0]);
    });

    it("should return 400 when user id supplied", async () => {
      const id = null;

      const result = await usersHandler.getUser(id);

      expect(result).toEqual({
        status: 400,
        message: `No user id supplied`,
      });
    });

    it("should return 404 when no user found", async () => {
      const id = "test-id";
      nock(apiUrl).get(`/users/${id}`).reply(404);

      const result = await usersHandler.getUser(id);

      expect(result).toEqual({
        status: 404,
        message: `No user found with id: ${id}`,
      });
    });

    it("should throw when returning a server error", async () => {
      const id = "test-id";
      nock(apiUrl).get(`/users/${id}`).reply(500);

      const error = new Error("API: Error getting user");

      await expect(async () => await usersHandler.getUser(id)).rejects.toThrow(
        error
      );
    });
  });

  describe("addUser", () => {
    it("should return 200 when created successfully", async () => {
      const user = getUsersResponse[0];
      nock(apiUrl).post("/users").reply(200);

      const result = await usersHandler.addUser(user);

      expect(result).toBe(200);
    });

    it("should return 400 when user data in incorrect shape", async () => {
      const user = {};
      const result = await usersHandler.addUser(user as User);

      expect(result).toEqual({ message: "Incorrect user data", status: 400 });
    });

    it("should throw when returning a server error", async () => {
      const user = getUsersResponse[0];
      nock(apiUrl).post("/users").reply(500);

      const error = new Error("API: Error creating user");

      await expect(
        async () => await usersHandler.addUser(user)
      ).rejects.toThrow(error);
    });
  });

  // deleteUser
});
