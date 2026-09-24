import { User } from "../models/User";
import { UserAPI } from "../services/UserAPI";
import { UserRepository } from "./UserRepository";

export class UserRepositoryImpl implements UserRepository {
  constructor(private api: UserAPI) {}

  async getUsers(): Promise<User[]> {
    return await this.api.getUsers();
  }
}