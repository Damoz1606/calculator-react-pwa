import mongoose from "mongoose";
import config from "./config";

export const initConnection = async () => {
    const URI: string = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_HOST}/${config.MONGO_NAME}?retryWrites=true&w=majority`;
    try {
        const res = await mongoose.connect(URI,  {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log(`Mongo is connect to: ${res.connection.name}`);
    } catch (error: any) {
        console.log("Ups! Something went wrong");
    }
}