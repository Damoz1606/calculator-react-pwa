import { Schema, model } from 'mongoose';
import { User } from '../interfaces/user';

const schema = new Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    history: [{ entry: String }]
}, {
    timestamps: false,
    versionKey: false
});

export default model<User>("calculatoruser", schema);