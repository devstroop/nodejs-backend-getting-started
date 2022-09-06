const express = require('express');
const mongoose = require('mongoose');

const authRouter = require('./routers/auth.router');
const adminRouter = require('./routers/admin.router');

const app = express();

app.use(express.json());

app.use(authRouter);
app.use(adminRouter);

mongoose
    .connect('mongodb+srv://root:9qawwvky4T0bPqhE@cluster0.3gu8lkk.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('Database connected successfully');
    }).catch((e) => {
        console.log(e);
    });

app.listen(8080, '0.0.0.0', () => {
    console.log('Connected at port 3000');
});