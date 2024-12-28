import { Request, Response } from 'express';
import { UserService } from '../services/usersService';

export class UserController {
    private userService = new UserService();

    async createUser(req: Request, res: Response): Promise<void> {
        const { username, email, password } = req.body;
        if (!username || !email) {
            res.status(400).json({ error: 'Username and email are required.' });
            return;
        }
        const newUser = await this.userService.createUser(username, email, password);
        res.status(201).json(newUser);
    }

    async getAllUsers(req: Request, res: Response): Promise<void> {
        const users = await this.userService.getAllUsers();
        res.status(200).json(users);
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const user = await this.userService.getUserById(id);
        if (!user) {
            res.status(404).json({ error: 'User not found.' });
            return;
        }
        res.status(200).json(user);
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const updates = req.body;
        const updatedUser = await this.userService.updateUser(id, updates);
        if (!updatedUser) {
            res.status(404).json({ error: 'User not found.' });
            return;
        }
        res.status(200).json(updatedUser);
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await this.userService.deleteUser(id);
        res.status(204).send();
    }
}