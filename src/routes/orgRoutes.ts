import express from 'express';
import {
  getOrg,
  getOrgs,
  updateOrg,
  postOrg,
  deleteOrg,
  getOrgUsers
  // getOrgUsers,
  // postUserToOrg,
  // getUserFromOrg,
  // deleteUserFromOrg
} from '../controllers/orgControllers';

const router = express();

router.route('/:orgID').get(getOrg);
router.route('/').get(getOrgs);
router.route('/:orgID').patch(updateOrg);
router.route('/').post(postOrg);
router.route('/:orgID').delete(deleteOrg);
router.route('/:orgID/users').get(getOrgUsers);

export default router;
