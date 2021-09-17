import app from './app';
import { initConnection } from './config/database.config';

initConnection();

app.listen(app.get("port"), () => {
    console.log(`Server on port: ${app.get("port")}`);
});