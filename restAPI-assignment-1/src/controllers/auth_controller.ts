import { Request, Response, NextFunction } from 'express';
import authService from '../services/authService';

const register = async (req: Request, res: Response) => {
    try {
        const { email, username, password } = req.body;
        const user = await authService.register(email, username, password);
        res.status(200).send(user);
    } catch (err: any) {
        res.status(400).send(err.message);
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const tokens = await authService.login(email, password);
        res.status(200).send(tokens);
    } catch (err: any) {
        res.status(400).send(err.message);
    }
};

const refresh = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;
        const tokens = await authService.refresh(refreshToken);
        res.status(200).send(tokens);
    } catch (err) {
        res.status(400).send("fail");
    }
};

const logout = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;
        await authService.logout(refreshToken);
        res.status(200).send("success");
    } catch (err) {
        res.status(400).send("fail");
    }
};

export default {
    register,
    login,
    refresh,
    logout
};