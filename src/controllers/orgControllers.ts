import { IOrg, orgsMap, OrgType } from '../repository/orgs';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../repository/users';

// get a org
export const getOrg = (req: Request, res: Response) => {
  const foundOrg = orgsMap[req.params.orgID];

  if (foundOrg) {
    return res.json(orgsMap[req.params.orgID]);
  } else {
    return res.sendStatus(404);
  }
};

// get orgs
export const getOrgs = (req: Request, res: Response) => {
  return res.json(orgsMap);
};

// post org
export const postOrg = (req: Request, res: Response) => {
  const newId = uuidv4();
  const newUserGroup: IUser[] = [];
  const neworg: IOrg = {
    id: newId,
    name: req.body.name,
    orgType: OrgType.PUBLIC,
    motto: req.body.motto,
    users: newUserGroup
  };

  if (!neworg.name || !neworg.motto) {
    return res.sendStatus(400);
  }

  orgsMap[newId] = neworg;
  return res.json(orgsMap);
};

// update org
export const updateOrg = (req: Request, res: Response) => {

  const foundOrg = orgsMap[req.params.orgID];

  if (foundOrg) {
    const currentOrg = orgsMap[req.params.orgID];

    const updatedorg: IOrg = {
      id: req.params.orgID,
      name: req.body.name,
      orgType: currentOrg.orgType,
      motto: req.body.motto,
      users: currentOrg.users
    };
    orgsMap[req.params.orgID] = updatedorg;
    return res.json({ msg: 'org updated', updatedorg });
    // orgs.forEach((org) => {
    //   if (Number(org.id) === parseInt(req.params.id)) {
    //     org.name = updateorg.name ? updateorg.name : org.name;
    //     org.motto = updateorg.motto ? updateorg.motto : org.motto;
    //     return res.json({ msg: 'org updated', org });
    //   }
    // });
  } else {
    return res.sendStatus(404);
  }
};

// delete org
export const deleteOrg = (req: Request, res: Response) => {
  const foundOrg = orgsMap[req.params.orgID];

  if (foundOrg) {
    delete orgsMap[req.params.orgID];
    return res.json({
      msg: 'org deleted',
      orgsMap
    });
  } else {
    return res.sendStatus(404);
  }
};

// get org users
export const getOrgUsers = (req: Request, res: Response) => {
  const foundOrg = orgsMap[req.params.orgID];

  if (foundOrg) {
    return res.json(orgsMap[req.params.orgID].users);
  }
};

// get a user from org
export const getUserFromOrg = (req: Request, res: Response) => {
  const found = orgsMap[req.params.orgID].users;

  if (found) {
    return res.json(found.filter((user) => user.id === req.params.id));
  } else {
    return res.sendStatus(400);
  }
};

// post user to org
export const postUserToOrg = (req: Request, res: Response) => {
  const newUser: IUser = {
    id: uuidv4(),
    name: req.body.name,
    email: req.body.email
  };

  if (!newUser.name || !newUser.email) {
    return res.sendStatus(400);
  }

  orgsMap[req.params.orgID].users.push(newUser);
  return res.json(orgsMap[req.params.orgID].users);
};
