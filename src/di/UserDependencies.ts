import { UserRepositoryImpl } from "../repositories/UserRepositoryImpl";
import { UserAPI } from "../services/UserAPI";
import { GetUsers } from "../usecases/GetUsers";

const userAPI = new UserAPI();

const userRepository = new UserRepositoryImpl(userAPI);

export const getUsersUseCase = new GetUsers(userRepository);