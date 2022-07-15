import { IUser, users } from '../repository/users';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

// get a user
export const getUser = (req: Request, res: Response) => {
  const found = users.some(
    (user) => Number(user.id) === parseInt(req.params.id)
  );

  if (found) {
    return res.json(
      users.filter((user) => Number(user.id) === parseInt(req.params.id))
    );
  } else {
    return res.sendStatus(400);
  }
};

// get users
export const getUsers = (req: Request, res: Response) => {
  return res.json(users);
};

// post user
export const postUser = (req: Request, res: Response) => {
  const newUser: IUser = {
    id: uuidv4(),
    name: req.body.name,
    email: req.body.email
  };

  if (!newUser.name || !newUser.email) {
    return res.sendStatus(400);
  }

  users.push(newUser);
  return res.json(users);
};

// update user
export const updateUser = (req: Request, res: Response) => {
  const found = users.some(
    (user) => Number(user.id) === parseInt(req.params.id)
  );

  if (found) {
    const updateUser = req.body;

    users.forEach((user) => {
      if (Number(user.id) === parseInt(req.params.id)) {
        user.name = updateUser.name ? updateUser.name : user.name;
        user.email = updateUser.email ? updateUser.email : user.email;
        return res.json({ msg: 'User updated', user });
      }
    });
  } else {
    return res.sendStatus(400);
  }
};

// delete user
export const deleteUser = (req: Request, res: Response) => {
  const found = users.some(
    (user) => Number(user.id) === parseInt(req.params.id)
  );

  if (found) {
    const indexOfObject = users.findIndex((user) => {
      return user.id === req.params.id;
    });

    if (indexOfObject !== -1) {
      users.splice(indexOfObject, 1);
    }
    return res.json({
      msg: 'User deleted',
      users
    });
  } else {
    return res.sendStatus(400);
  }
};
