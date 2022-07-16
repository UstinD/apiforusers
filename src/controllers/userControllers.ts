import { IUser, usersMap } from '../repository/users';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

// get a user
export const getUser = (req: Request, res: Response) => {
  const foundUser = usersMap[req.params.id];

  if (foundUser) {
    return res.json(usersMap[req.params.id]);
  } else {
    return res.sendStatus(404);
  }
};

// get users
export const getUsers = (req: Request, res: Response) => {
  return res.json(usersMap);
};

// post user
export const postUser = (req: Request, res: Response) => {
  const newId = uuidv4();
  const newuser: IUser = {
    id: newId,
    name: req.body.name,
    email: req.body.email
  };

  if (!newuser.name || !newuser.email) {
    return res.sendStatus(400);
  }

  usersMap[newId] = newuser;
  return res.json(usersMap);
};

// update user
export const updateUser = (req: Request, res: Response) => {
  const foundUser = usersMap[req.params.id];

  if (foundUser) {
    const updateduser: IUser = {
      id: req.params.id,
      name: req.body.name,
      email: req.body.email
    };
    usersMap[req.params.id] = updateduser;
    return res.json({ msg: 'user updated', updateduser });
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

// delete user
export const deleteUser = (req: Request, res: Response) => {
  const foundUser = usersMap[req.params.id];

  if (foundUser) {
    delete usersMap[req.params.id];
    return res.json({
      msg: 'user deleted',
      usersMap
    });
  } else {
    return res.sendStatus(404);
  }
};
