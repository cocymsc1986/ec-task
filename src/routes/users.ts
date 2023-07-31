import express from "express";

import { usersHandler } from "../handlers";

import { GetUserResponse, GetUsersResponse } from "../handlers/users/types";

const usersRouter = express.Router();

usersRouter.get("/", async (req, res): Promise<GetUsersResponse> => {
  try {
    const response = await usersHandler.getUsers();
    return res.send(response);
  } catch (e) {
    throw new Error("Server: Error getting users");
  }
});

usersRouter.get("/:id", async (req, res): Promise<GetUserResponse | Error> => {
  const { id } = req.params;

  try {
    const response = await usersHandler.getUser(id);
    return res.send(response);
  } catch (e) {
    throw new Error("Server: Error getting user");
  }
});

usersRouter.post("/", async (req, res): Promise<number | Error> => {
  const user = req.body?.user;

  try {
    const response = await usersHandler.addUser(user);
    return res.send(response);
  } catch (e) {
    throw new Error("Server: Error adding user");
  }
});

usersRouter.delete("/:id", (req, res) => {
  // handle delete
});

export { usersRouter };
