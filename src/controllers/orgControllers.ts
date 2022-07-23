import { IOrg } from '../repository/orgs';
import instance from '../repository/orgs';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Ajv from 'ajv';
import { io } from '../index';

// get a org
export const getOrg = async (req: Request, res: Response) => {
  const listoforgs = await instance.getOrg(req.params.orgID);
  return res.json(listoforgs);
};

// get orgs
export const getOrgs = async (req: Request, res: Response) => {
  const listoforgs = await instance.getOrgs();
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

  const listoforgs = await instance.postOrg(
    newId,
    req.body.org_name,
    req.body.motto
  );
  io.emit('neworg', neworg);
  return res.json(listoforgs);
};

// update org
export const updateOrg = async (req: Request, res: Response) => {
  const foundOrg = await instance.getOrg(req.params.orgID);

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

    const didupdate = await instance.updateOrg(
      req.params.orgID,
      thename,
      themotto
    );
    if (didupdate) {
      io.emit('updatedorg', updatedorg);
      return res.json({ msg: 'org updated', updatedorg });
    }
    return res.sendStatus(404);
  } else {
    return res.sendStatus(404);
  }
};

// delete org
export const deleteOrg = async (req: Request, res: Response) => {
  const diddelete = await instance.deleteOrg(req.params.orgID);
  if (diddelete) {
    const listoforgs = await instance.getOrgs();
    io.emit('deletedorg', listoforgs);
    return res.json({
      msg: 'org deleted',
      listoforgs
    });
  }
  return res.sendStatus(404);
};

// get org users
export const getOrgUsers = async (req: Request, res: Response) => {
  const listoforgs = await instance.getOrgUsers(req.params.orgID);
  return res.json(listoforgs);
};
