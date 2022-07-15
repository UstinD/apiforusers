import { IOrg, orgs } from '../repository/orgs';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

// get a org
export const getOrg = (req: Request, res: Response) => {
  const foundOrg = orgs.some(
    (org) => Number(org.id) === parseInt(req.params.id)
  );

  if (foundOrg) {
    return res.json(
      orgs.filter((org) => Number(org.id) === parseInt(req.params.id))
    );
  } else {
    return res.sendStatus(400);
  }
};

// get orgs
export const getOrgs = (req: Request, res: Response) => {
  return res.json(orgs);
};

// post org
export const postOrg = (req: Request, res: Response) => {
  const neworg: IOrg = {
    id: uuidv4(),
    name: req.body.name,
    motto: req.body.motto
  };

  if (!neworg.name || !neworg.motto) {
    return res.sendStatus(400);
  }

  orgs.push(neworg);
  return res.json(orgs);
};

// update org
export const updateOrg = (req: Request, res: Response) => {
  const foundOrg = orgs.some(
    (org) => Number(org.id) === parseInt(req.params.id)
  );

  if (foundOrg) {
    const updateorg = req.body;

    orgs.forEach((org) => {
      if (Number(org.id) === parseInt(req.params.id)) {
        org.name = updateorg.name ? updateorg.name : org.name;
        org.motto = updateorg.motto ? updateorg.motto : org.motto;
        return res.json({ msg: 'org updated', org });
      }
    });
  } else {
    return res.sendStatus(400);
  }
};

// delete org
export const deleteOrg = (req: Request, res: Response) => {
  const foundOrg = orgs.some(
    (org) => Number(org.id) === parseInt(req.params.id)
  );

  if (foundOrg) {
    const indexOfObject = orgs.findIndex((org) => {
      return org.id === req.params.id;
    });

    if (indexOfObject !== -1) {
      orgs.splice(indexOfObject, 1);
    }
    return res.json({
      msg: 'org deleted',
      orgs
    });
  } else {
    return res.sendStatus(400);
  }
};
