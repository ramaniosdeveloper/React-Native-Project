import { User } from "../models/User";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export class UserAPI {
  async getUsers(): Promise<User[]> {
    const response = await fetch(`${BASE_URL}/users`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch users. Status: ${response.status}`
      );
    }

    const data: User[] = await response.json();

    return data;
  }
}