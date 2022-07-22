import express from 'express';
import { getUser } from '../controllers/userControllers';
import { getUsers } from '../controllers/userControllers';
import { updateUser } from '../controllers/userControllers';
import { postUser } from '../controllers/userControllers';
import { deleteUser } from '../controllers/userControllers';
import { login } from '../controllers/userControllers';

const router = express();

router.route('/:id').get(getUser);
router.route('/').get(getUsers);
router.route('/:id').put(updateUser);
router.route('/').post(postUser);
router.route('/:id').delete(deleteUser);
router.route('/login').post(login);

export default router;
