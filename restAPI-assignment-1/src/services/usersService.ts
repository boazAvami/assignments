import UserRepository from '../repositories/usersRepository';
import { IUser } from '../models/users_model';

export class UserService {
    async createUser(username: string, email: string, password: string): Promise<IUser> {
        return await UserRepository.addUser({ username, email, password }) as unknown as IUser;
    }

    async getAllUsers(): Promise<IUser[]> {
        return await UserRepository.getAllUsers();
    }

    async getUserById(id: string): Promise<IUser | null> {
        return await UserRepository.getUserById(id);
    }

    async updateUser(id: string, updates: Partial<IUser>): Promise<IUser | null> {
        return await UserRepository.updateUser(id, updates);
    }

    async deleteUser(id: string): Promise<{ message: string }> {
        await UserRepository.deleteUser(id);
        return { message: 'Comment deleted successfully' };
    }
}
