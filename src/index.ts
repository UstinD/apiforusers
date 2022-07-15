import express from 'express';
import userRoutes from './routes/userRoutes';
import orgRoutes from './routes/orgRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/users', userRoutes);
app.use('/api/orgs', orgRoutes);

app.listen(3000, () => console.log('Server Started'));
