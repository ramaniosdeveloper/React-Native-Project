import { User } from "../models/User";
import { UserRepository } from "../repositories/UserRepository";

export class GetUsers {
  constructor(private repository: UserRepository) {}

  async execute(): Promise<User[]> {
    return await this.repository.getUsers();
  }
}