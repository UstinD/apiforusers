import { IUser } from '../repository/users';
import instance from '../repository/users';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrpyt from 'bcryptjs';
import Ajv from 'ajv';
import Jwt from 'jsonwebtoken';

// get a user
export const getUser = async (req: Request, res: Response) => {
  try {
    const token = req.header('Authorization')?.substring(7);
    Jwt.verify(token as string, 'MY_SECRET_KEY');
  } catch (err) {
    return res.json({
      msg: 'you are not authorized to view user'
    });
  }

  const listofusers = await instance.getUser(req.params.id);
  if (listofusers.length < 1) {
    return res.sendStatus(404);
  }
  return res.json(listofusers[0]);
};

// get users
export const getUsers = async (req: Request, res: Response) => {
  const listofusers = await instance.getUsers();
  return res.json(listofusers);
};

// post user
export const postUser = async (req: Request, res: Response) => {
  const newId = uuidv4();
  const ajv = new Ajv();
  const schema = {
    type: 'object',
    properties: {
      user_id: { type: 'string' },
      username: { type: 'string' },
      password: { type: 'string' },
      email: { type: 'string' }
    },
    required: ['user_id', 'username', 'password', 'email']
  };
  const newuser: IUser = {
    user_id: newId,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  };
  const validate = ajv.compile(schema);
  const valid = validate(newuser);

  if (!valid) {
    return res.json({
      msg: `your request was not valid because ${JSON.stringify(
        validate.errors
      )}`
    });
  }
  const hashedpassword = bcrpyt.hashSync(req.body.password, 8);

  const listofusers = await instance.postUser(
    newId,
    req.body.username,
    hashedpassword,
    req.body.email
  );
  return res.json(listofusers);
};

// update user
export const updateUser = async (req: Request, res: Response) => {
  const foundUserlist = await instance.getUser(req.params.id);
  const foundUser = foundUserlist[0];

  if (foundUser) {
    try {
      const token = req.header('Authorization')?.substring(7);
      Jwt.verify(token as string, 'MY_SECRET_KEY');
    } catch (err) {
      return res.json({
        msg: 'you are not authorized to modify user'
      });
    }
    const ajv = new Ajv();
    const schema = {
      type: 'object',
      properties: {
        user_id: { type: 'string' },
        username: { type: 'string' },
        password: { type: 'string' },
        email: { type: 'string' },
        org_id: { type: ['string', 'null'] }
      },
      required: ['user_id', 'username', 'password', 'email', 'org_id']
    };

    let thename = foundUser.username;
    let theemail = foundUser.email;
    let theorgid = foundUser.org_id as string | null;

    if (typeof req.body.username === 'string') {
      thename = req.body.username as string;
    }
    if (typeof req.body.email === 'string') {
      theemail = req.body.email as string;
    }
    if (typeof req.body.org_id === 'string') {
      theorgid = req.body.org_id as string;
    }

    const updateduser: IUser = {
      user_id: req.params.id,
      username: thename,
      password: foundUser.password,
      email: theemail,
      org_id: theorgid
    };

    const validate = ajv.compile(schema);
    const valid = validate(updateduser);

    if (!valid) {
      return res.json({
        msg: `your request was not valid because ${JSON.stringify(
          validate.errors
        )}`
      });
    }

    let didupdate = true;
    if (theorgid == null) {
      didupdate = await instance.updateUser(req.params.id, thename, theemail);
    } else {
      didupdate = await instance.updateUser(
        req.params.id,
        thename,
        theemail,
        theorgid
      );
    }
    if (didupdate) {
      return res.json({ msg: 'user updated', updateduser });
    }
    return res.sendStatus(401);
  } else {
    return res.sendStatus(404);
  }
};

// delete user
export const deleteUser = async (req: Request, res: Response) => {
  const diddelete = await instance.deleteUser(req.params.id);
  if (diddelete) {
    const listofusers = await instance.getUsers();
    return res.json({
      msg: 'user deleted',
      listofusers
    });
  }
  return res.sendStatus(404);
};

export const login = async (req: Request, res: Response) => {
  const didlogin = await instance.signIn(req.body.username, req.body.password);
  if (didlogin == 'false') {
    return res.json({
      msg: 'username or password was incorrect'
    });
  }
  return res.json({
    msg: 'login successful',
    accesstoken: didlogin
  });
};
