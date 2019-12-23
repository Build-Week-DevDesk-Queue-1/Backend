const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('./auth/authRouter');
const userRouter = require('./user/userRouter');
const ticketsRouter = require('./tickets/ticketsRouter');
const { validateToken } = require('./middleware');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/user',  validateToken, userRouter);
server.use('/api/tickets', validateToken, ticketsRouter);

server.get('/', (req, res) => res.status(200).json({ message: 'API is running' }));

module.exports = server;