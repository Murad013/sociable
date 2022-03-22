require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const userRouter = require('./routes/user-routes');
const postRouter = require('./routes/post-routes');
//const postRouter = require('../server/routes/post-routes');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

const port = process.env.SERVER_PORT;
app.listen(port, () => {
     console.log(`Listening on port: ${port}`);
});