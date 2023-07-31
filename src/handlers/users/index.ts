import axios from "axios";
import { GetUsersResponse, GetUserResponse } from "./types";
import { Error, User } from "../../types";

const apiUrl = process.env.API_URL;

export const usersHandler = {
  getUsers: async (): Promise<GetUsersResponse> => {
    try {
      const response = await axios.get(`${apiUrl}/users`);

      return response.data;
    } catch (e) {
      throw new Error("API: Error getting users");
    }
  },

  getUser: async (id: string): Promise<GetUserResponse | Error> => {
    if (!id) {
      return {
        status: 400,
        message: "No user id supplied",
      };
    }

    try {
      const response = await axios.get(`${apiUrl}/users/${id}`);

      return response.data;
    } catch (e) {
      if (e.response.status === 404) {
        return {
          status: 404,
          message: `No user found with id: ${id}`,
        };
      }
      throw new Error("API: Error getting user");
    }
  },

  addUser: async (user: User): Promise<number | Error> => {
    // This isn't implemented in the Nest API so have made some assumptions
    // - id is created incrementally in the DB so not adding here (would be simple
    //   uuid() if needed here)
    // - user shape is same as what is stored in db

    if (!user || !user.name || !user.email) {
      return {
        status: 400,
        message: "Incorrect user data",
      };
    }

    try {
      const response = await axios.post(`${apiUrl}/users`, user);

      return response.status;
    } catch (e) {
      throw new Error("API: Error creating user");
    }
  },
};
