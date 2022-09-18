const express = require('express');
const mongoose = require('mongoose');

const authRouter = require('./routers/auth.router');
const adminRouter = require('./routers/admin.router');

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.MONGODB_URI;

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

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Started at internal port ${PORT}`);
});