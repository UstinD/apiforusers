import express from 'express';
import routes from './routes/userRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/users', routes);

app.listen(3000, () => console.log('Server Started'));
