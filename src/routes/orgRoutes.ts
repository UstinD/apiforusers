import express from 'express';
import { getOrg } from '../controllers/orgControllers';
import { getOrgs } from '../controllers/orgControllers';
import { updateOrg } from '../controllers/orgControllers';
import { postOrg } from '../controllers/orgControllers';
import { deleteOrg } from '../controllers/orgControllers';
import { getOrgUsers } from '../controllers/orgControllers';
import { postUserToOrg } from '../controllers/orgControllers';
import { getUserFromOrg } from '../controllers/orgControllers';


const router = express();

router.route('/:orgID').get(getOrg);
router.route('/').get(getOrgs);
router.route('/:orgID').put(updateOrg);
router.route('/').post(postOrg);
router.route('/:orgID').delete(deleteOrg);
router.route('/:orgID/users').get(getOrgUsers);
router.route('/:orgID/users').post(postUserToOrg);
router.route('/:orgID/users/:id').get(getUserFromOrg);

export default router;
