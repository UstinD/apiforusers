import express from 'express';
import userRoutes from './routes/userRoutes';
import orgRoutes from './routes/orgRoutes';
import http from 'http';
import { Server } from 'socket.io';

const app = express();

const server = http.createServer(app);
export const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/users', userRoutes);
app.use('/orgs', orgRoutes);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/page.html');
});

io.on('connection', (socket) => {
  console.log('someone connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => console.log('Server Started'));
