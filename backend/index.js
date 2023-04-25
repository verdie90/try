import express from "express";
import cors from "cors";
import session, { Cookie } from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import AuthRoute from "./routes/auth/AuthRoute.js";
import UserRoute from "./routes/users/UserRoute.js";
import RoleRoute from "./routes/users/RoleRoute.js";
import RoleUserRoute from "./routes/users/RoleUserRoute.js";
import PermissionRoute from "./routes/users/PermissionRoute.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db : db,
    clearExpired: true,
    checkExpirationInterval: 900000,
    expiration: 86400000,
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
        maxAge: 1000 * 60 * 60 * 24 * 1,
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
app.use(RoleRoute);
app.use(RoleUserRoute);
app.use(PermissionRoute);

// store.sync();

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});