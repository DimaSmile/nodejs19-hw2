import * as dotenv from "dotenv";
import App from "./application";

dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = new App(PORT);

app.listen();


