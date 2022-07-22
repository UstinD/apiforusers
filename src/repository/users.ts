import { Pool } from 'pg';
import bcrpyt from 'bcryptjs';
import Jwt from 'jsonwebtoken';

export interface IUser {
  user_id: string;
  username: string;
  password: string;
  email: string;
  org_id?: string | null;
}

// export const usersMap: { [key: string]: IUser } = {
//   '1': {
//     user_id: '1',
//     username: 'John',
//     email: 'john@gmail.com'
//   },
//   '2': {
//     user_id: '2',
//     username: 'Smith',
//     email: 'smith@gmail.com'
//   },
//   '3': {
//     user_id: '3',
//     username: 'Chris',
//     email: 'chris@gmail.com'
//   },
//   '4': {
//     user_id: '4',
//     username: 'Jack',
//     email: 'jack@gmail.com'
//   }
// };

class Users {
  readonly pool;

  constructor() {
    this.pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'user_data',
      password: 'shweetie',
      port: 5432
    });
  }
  async getUsers(): Promise<IUser[]> {
    try {
      const allUsers = await this.pool.query('SELECT * FROM users');
      return allUsers.rows as IUser[];
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getUser(id: string): Promise<IUser[]> {
    try {
      const theUser = await this.pool.query(
        `SELECT * FROM users WHERE user_id IN ('${id}')`
      );
      return theUser.rows as IUser[];
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async postUser(
    id: string,
    name: string,
    password: string,
    email: string
  ): Promise<IUser[]> {
    try {
      await this.pool.query(
        `INSERT INTO users (user_id, username, password, email) VALUES ('${id}', '${name}', '${password}', '${email}')`
      );
      const allUsers = await this.pool.query('SELECT * FROM users');
      return allUsers.rows as IUser[];
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      const diddelete = await this.pool.query(
        `DELETE FROM users where user_id = '${id}'`
      );
      if (diddelete) {
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async updateUser(
    id: string,
    name: string,
    email: string,
    orgid?: string
  ): Promise<boolean> {
    try {
      let update: any;
      if (orgid) {
        update = await this.pool.query(
          `UPDATE users SET username = '${name}', email = '${email}', org_id = '${orgid}'  WHERE user_id = '${id}'`
        );
      } else {
        update = await this.pool.query(
          `UPDATE users SET username = '${name}', email = '${email}'  WHERE user_id = '${id}'`
        );
      }
      if (update) {
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async signIn(name: string, password: string): Promise<string> {
    try {
      const SECRET = 'MY_SECRET_KEY';
      const theUser = await this.pool.query(
        `SELECT * FROM users WHERE username IN ('${name}')`
      );
      if (theUser.rows.length == 1) {
        const isValid = bcrpyt.compareSync(password, theUser.rows[0].password);
        if(!isValid) {
          return 'false';
        }
        const token = Jwt.sign({ id: theUser.rows[0].user_id }, SECRET, {
          expiresIn: 86400 // 24 hours
        });
        return token;
      }
      return 'false';
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

const instance = new Users();
Object.freeze(instance);
export default instance;
