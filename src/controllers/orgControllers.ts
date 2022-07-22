import { IOrg, orgsMap, OrgType, Orgs } from '../repository/orgs';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../repository/users';
import Ajv from 'ajv';
import { json } from 'stream/consumers';

// get a org
export const getOrg = async (req: Request, res: Response) => {
  const orgs = new Orgs();
  const listoforgs = await orgs.getOrg(req.params.orgID);
  return res.json(listoforgs);
};

// get orgs
export const getOrgs = async (req: Request, res: Response) => {
  const orgs = new Orgs();
  const listoforgs = await orgs.getOrgs();
  return res.json(listoforgs);
};

// post org
export const postOrg = async (req: Request, res: Response) => {
  const newId = uuidv4();
  const ajv = new Ajv();
  const schema = {
    type: 'object',
    properties: {
      org_id: { type: 'string' },
      org_name: { type: 'string' },
      motto: { type: 'string' }
    },
    required: ['org_id', 'org_name', 'motto']
  };
  const neworg: IOrg = {
    org_id: newId,
    org_name: req.body.org_name,
    motto: req.body.motto
  };
  const validate = ajv.compile(schema);
  const valid = validate(neworg);

  if (!valid) {
    return res.json({
      msg: `your request was not valid because ${JSON.stringify(
        validate.errors
      )}`
    });
  }

  const orgs = new Orgs();
  const listoforgs = await orgs.postOrg(newId, req.body.org_name, req.body.motto);
  return res.json(listoforgs);
};

// update org
export const updateOrg = async (req: Request, res: Response) => {
  const org = new Orgs();
  const foundOrg = await org.getOrg(req.params.orgID);

  if (foundOrg) {
    const ajv = new Ajv();
    const schema = {
      type: 'object',
      properties: {
        org_id: { type: 'string' },
        org_name: { type: 'string' },
        motto: { type: 'string' }
      },
      required: ['org_id', 'org_name', 'motto']
    };

    let thename = foundOrg.org_name;
    let themotto = foundOrg.motto;

    if (typeof req.body.org_name === 'string') {
      thename = req.body.org_name as string;
    }
    if (typeof req.body.motto === 'string') {
      themotto = req.body.motto as string;
    }

    const updatedorg: IOrg = {
      org_id: req.params.orgID,
      org_name: thename,
      motto: themotto
    };

    const validate = ajv.compile(schema);
    const valid = validate(updatedorg);

    if (!valid) {
      return res.json({
        msg: `your request was not valid because ${JSON.stringify(
          validate.errors
        )}`
      });
    }

    const didupdate = await org.updateOrg(req.params.orgID, thename, themotto);
    if (didupdate) {
      return res.json({ msg: 'org updated', updatedorg });
    }
    return res.sendStatus(404);
  } else {
    return res.sendStatus(404);
  }
};

// delete org
export const deleteOrg = async (req: Request, res: Response) => {
  const orgs = new Orgs();
  const diddelete = await orgs.deleteOrg(req.params.orgID);
  if (diddelete) {
    const listoforgs = await orgs.getOrgs();
    return res.json({
      msg: 'org deleted',
      listoforgs
    });
  }
  return res.sendStatus(404);
};

// get org users
export const getOrgUsers = async (req: Request, res: Response) => {
  const orgs = new Orgs();
  const listoforgs = await orgs.getOrgUsers(req.params.orgID);
  return res.json(listoforgs);
};

// get a user from org
// export const getUserFromOrg = (req: Request, res: Response) => {
//   const found = orgsMap[req.params.orgID].users;

//   if (found) {
//     return res.json(found.filter((user) => user.id === req.params.id));
//   } else {
//     return res.sendStatus(400);
//   }
// };

// post user to org
// export const postUserToOrg = (req: Request, res: Response) => {
//   const ajv = new Ajv();
//   const schema = {
//     type: 'object',
//     properties: {
//       id: { type: 'string'},
//       name: { type: 'string' },
//       email: { type: 'string', format: 'email' }
//     },
//     required: ['id', 'name', 'email'],
//     additionalProperties: false
//   };

//   const newUser: IUser = {
//     id: uuidv4(),
//     name: req.body.name,
//     email: req.body.email
//   };
//   const validate = ajv.compile(schema);
//   const valid = validate(newUser);

//   if (!valid) {
//     return res.json({
//       msg: `your request was not valid because ${JSON.stringify(
//         validate.errors
//       )}`
//     });
//   }

//   // if (!newUser.name || !newUser.email) {
//   //   return res.sendStatus(400);
//   // }

//   orgsMap[req.params.orgID].users.push(newUser);
//   return res.json(orgsMap[req.params.orgID].users);
// };

// // delete user
// export const deleteUserFromOrg = (req: Request, res: Response) => {
//   const foundUser = orgsMap[req.params.orgID].users;
//   const found = foundUser.some((user) => user.id === req.params.id);

//   if (found) {
//     const indexOfObject = foundUser.findIndex((object) => {
//       return object.id === req.params.id;
//     });
//     if (indexOfObject !== -1) {
//       orgsMap[req.params.orgID].users.splice(indexOfObject, 1);
//     }
//     res.json({
//       msg: 'User deleted',
//       foundUser
//     });
//   } else {
//     res.sendStatus(400);
//   }
// };
