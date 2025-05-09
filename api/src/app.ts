import express, {Express} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connect from "./config/mongo.config";

import authRouter from "./routes/auth.router";
import appRouter from "./routes/app.router";
import bimRouter from "./routes/bim.router";
import oauthMiddle from "./middleware/oauth.middle";

const app : Express = express();
const port : number = 3000;

connect()

const whiteList = [
    "https://www.syncroniza.cl",
    "http://localhost:3001",
    "https://fbae-190-22-169-52.ngrok-free.app" // esta es la que usas en el celu
];


// Middleware
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || whiteList.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error(`Site: ${origin} not allowed by CORS`));
        }
    },
    credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/auth', authRouter);
app.use('/api/bim', bimRouter); // Nuevas rutas BIM
app.use('/', oauthMiddle, appRouter);


app.listen(port, () => {
  return console.log(`Express is listening at ${port}`);
});
