import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';

import heroesRouter from './routes/heroes.js';
import monstersRouter from './routes/monsters.js';

const app = express();

// start of the middleware function stack
app.use(logger('dev'));
app.use(cors());

app.use('/heroes', heroesRouter);
app.use('/monsters', monstersRouter);

// end of the middleware function stack
// forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || err.statusCode).send(err.message)
});

export default app;
