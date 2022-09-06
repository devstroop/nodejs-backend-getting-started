const express = require('express');
const mongoose = require('mongoose');

const authRouter = require('./routers/auth.router');
const adminRouter = require('./routers/admin.router');

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.MONGODB_URI || 'mongodb+srv://root:9qawwvky4T0bPqhE@cluster0.3gu8lkk.mongodb.net/?retryWrites=true&w=majority';

const app = express();

app.use(express.json());

app.use(authRouter);
app.use(adminRouter);

mongoose
    .connect(DB_URI)
    .then(() => {
        console.log('Database connected successfully');
    }).catch((e) => {
        console.log(e);
    });

app.listen(PORT, HOST, () => {
    console.log(`Started at port ${PORT}`);
});