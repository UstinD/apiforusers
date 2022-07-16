import express from 'express';
import userRoutes from './routes/userRoutes';
import orgRoutes from './routes/orgRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/users', userRoutes);
app.use('/orgs', orgRoutes);

app.listen(3000, () => console.log('Server Started'));
