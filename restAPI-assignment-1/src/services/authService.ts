import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userRepository from '../repositories/usersRepository';
import { NextFunction, Request, Response } from 'express';

type tTokens = {
    accessToken: string,
    refreshToken: string
};

const register = async (email: string,  username: string, password: string) => {
    if(email==null || username == null || password == null) {
        throw new Error('Params not valid')
    }
    
    const existingEmail = await userRepository.findByEmail(email);
    if (existingEmail) {
        throw new Error('Email is already in use');
    }

    const existingUsername = await userRepository.findByUsername(username);
    if (existingUsername) {
        throw new Error('Username is already taken');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = await userRepository.addUser({ email, username, password: hashedPassword });
    return user;    
};

const generateToken = (userId: string): tTokens | null => {
    if (!process.env.TOKEN_SECRET) {
        return null;
    }
    const random = Math.random().toString();
    const accessToken = jwt.sign({ _id: userId, random: random }, process.env.TOKEN_SECRET!, { expiresIn: process.env.TOKEN_EXPIRES });
    const refreshToken = jwt.sign({ _id: userId, random: random }, process.env.TOKEN_SECRET!, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES });
    return { accessToken, refreshToken };
};

const login = async (email: string, password: string) => {
    if(email==null || password == null) {
        throw new Error('Bad email or password')
    }
    
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error('Wrong username or password');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error('Wrong username or password');

    if (!process.env.TOKEN_SECRET) throw new Error('Server Error');

    const tokens = generateToken(user._id as string);
    if (!tokens) throw new Error('Server Error');

    if (!user.refreshToken) {
        user.refreshToken = [];
    }
    user.refreshToken.push(tokens.refreshToken);
    await userRepository.saveUser(user);

    return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        _id: user._id
    };
};

const verifyRefreshToken = async (refreshToken: string) => {
    if (!refreshToken) throw new Error('Invalid refresh token');
    if (!process.env.TOKEN_SECRET) throw new Error('Invalid refresh token');

    try {
        const decoded = jwt.verify(refreshToken, process.env.TOKEN_SECRET!) as { _id: string };
        const user = await userRepository.getUserById(decoded._id);
        if (!user || !user.refreshToken?.includes(refreshToken)) {
            throw new Error('Invalid refresh token');
        }
        const newTokens = generateToken(user._id as string);
        return { user, newTokens };
    } catch (error) {
        throw new Error('Invalid refresh token');
    }
};

const refresh = async (refreshToken: string) => {
    const { user, newTokens } = await verifyRefreshToken(refreshToken);
    if (!user.refreshToken) {
        user.refreshToken = [];
    }

    if (newTokens) {
        user.refreshToken.push(newTokens.refreshToken);
    } else {
        throw new Error('Failed to generate new tokens');
    }

    await userRepository.saveUser(user);

    return {
        accessToken: newTokens.accessToken,
        refreshToken: newTokens.refreshToken,
        _id: user._id
    };
};

const logout = async (refreshToken: string) => {
    const { user } = await verifyRefreshToken(refreshToken);
    const updatedTokens = user.refreshToken?.filter((token) => token !== refreshToken);
    user.refreshToken = updatedTokens || [];
    await userRepository.saveUser(user);
};

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.header('authorization');
    const token = authorization && authorization.split(' ')[1];

    if (!token) {
        res.status(401).send('Access Denied');
        return;
    }
    if (!process.env.TOKEN_SECRET) {
        res.status(500).send('Server Error');
        return;
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, payload: any) => {
        if (err) {
            res.status(401).send('Access Denied');
            return;
        }
        req.params.userId = payload._id;
        next();
    });
};

export default {
    register,
    login,
    refresh,
    logout,
    authMiddleware,
};