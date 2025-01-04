import { Request, Response } from 'express';
import { UserService } from '../services/usersService';

export class UserController {
    private userService = new UserService();

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