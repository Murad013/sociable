require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const userRouter = require('./routes/user-routes');
const postRouter = require('./routes/post-routes');

app.use(cors({origin: "http://localhost:3000", credentials: true, methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD']}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

const port = process.env.SERVER_PORT;
app.listen(port, () => {
     console.log(`Listening on port: ${port}`);
});