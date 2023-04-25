import express from "express";
import cors from "cors";
import session, { Cookie } from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import AuthRoute from "./routes/auth/AuthRoute.js";
import UserRoute from "./routes/users/UserRoute.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db : db,
});

// (async()=>{
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure : 'auto',
    }
}));

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(AuthRoute);
app.use(UserRoute);

// store.sync();

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});