import { Request, Response } from 'express';
import { User } from '../interfaces/user';
import userSchema from '../schema/user.schema';
import { generateToken } from '../auth/auth';
import { encript, compareEncript } from '../auth/encription';

export const postSignup = async (req: Request, res: Response) => {
    try {
        const user: User = req.body;
        user.password = encript(user.password);
        const newUser: User = await userSchema.create(user);
        if (newUser) {
            const token = generateToken({ _id: newUser._id })
            return res.status(200).json({ token });
        }
        return res.status(401).json({ error: "Something went wrong" });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const postSignin = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await userSchema.findOne({ username });
        if (user) {
            if (compareEncript(password, user.password)) {
                const token = generateToken({ _id: user._id })
                return res.status(200).json({ token });
            }
        }
        return res.status(400).json({ error: "Not found" })
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getUser = async (req: Request | any, res: Response) => {
    try {
        const { _id } = req.payload;
        const user = await userSchema.findById(_id);
        return res.status(200).json(user);
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const putUser = async (req: Request | any, res: Response) => {
    try {
        const { _id } = req.payload;
        const user: User = req.body;
        const updateUser = await userSchema.findByIdAndUpdate(_id, {username: user.username}, { new: true })
        return res.status(200).json(updateUser);
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const putPassword = async (req: Request | any, res: Response) => {
    try {
        const { username, password } = req.body;
        let user = await userSchema.findOne({ username: username })
        if (user) {
            console.log(encript(password));
            user.password = encript(password);
            await userSchema.findByIdAndUpdate(user._id, user);
            return res.status(200).json({ message: "Password Changed", status: true });
        }
        return res.status(400).json({ message: "User not found", status: false })
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const deleteUser = async (req: Request | any, res: Response) => {
    try {
        const { _id } = req.payload;
        const user = await userSchema.findByIdAndRemove(_id);
        return res.status(200).json(user);
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const postHistoryEntry = async (req: Request | any, res: Response) => {
    try {
        const { _id } = req.payload;
        const { entry } = req.body;
        const user = await userSchema.findByIdAndUpdate(_id,
            { $push: { history: [{ entry: entry }] } },
            { new: true });
        return res.status(200).json(user);
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const putHistoryEntry = async (req: Request | any, res: Response) => {
    try {
        const { _id } = req.payload;
        const { historyID } = req.params;
        const { entry } = req.body;
        console.log(entry);
        const user = await userSchema.findOneAndUpdate(
            { _id: _id, "history._id": historyID },
            { $set: { "history.$": { entry: entry } } },
            { new: true });
        return res.status(200).json(user);
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const deleteHistoryEntry = async (req: Request | any, res: Response) => {
    try {
        const { _id } = req.payload;
        const { historyID } = req.params;
        const user = await userSchema.findOneAndUpdate(
            { _id: _id },
            { $pull: { history: { _id: historyID } } },
            { new: true });
        return res.status(200).json(user);
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const deleteHistory = async (req: Request | any, res: Response) => {
    try {
        const { _id } = req.payload;
        const user = await userSchema.findByIdAndUpdate(
            _id,
            { $pull: { history: {} } },
            { new: true });
        return res.status(200).json(user);
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}