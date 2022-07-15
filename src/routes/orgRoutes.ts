import express from 'express';
import { getOrg } from '../controllers/orgControllers';
import { getOrgs } from '../controllers/orgControllers';
import { updateOrg } from '../controllers/orgControllers';
import { postOrg } from '../controllers/orgControllers';
import { deleteOrg } from '../controllers/orgControllers';

const router = express();

router.route('/:id').get(getOrg);
router.route('/').get(getOrgs);
router.route('/:id').put(updateOrg);
router.route('/').post(postOrg);
router.route('/:id').delete(deleteOrg);

export default router;
