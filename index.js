import express , { json, urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import Root from "./src/routes.js";
import dotenv from 'dotenv';
dotenv.config();

const Port = process.env.PORT;
const Url = process.env.URL;
const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs')
   .set('views', path.join(__dirname, 'src/views'))

app.use(json())
   .use(cors())
   .use(cookieParser())
   .use(urlencoded({ extended: true }))
   .use(Root)
   .use((_ , res) => res.status(404).render("Errors/404.ejs"));

app.listen(Port, () => {
    console.log(`Server is running on port ${Url}${Port}`);
});




