import { Pool } from 'pg';

export enum OrgType {
  PRIVATE = 'private',
  PUBLIC = 'public',
  NONPROFIT = 'non-profit'
}
export interface IOrg {
  org_id: string;
  org_name: string;
  motto: string;
}
export interface IUserFromOrg {
  user_id: string;
  username: string;
}

export const orgsMap: { [key: string]: IOrg } = {
  '1': {
    org_id: '1',
    org_name: 'Nike',
    motto: 'Just Do it'
  },
  '2': {
    org_id: '2',
    org_name: 'KFC',
    motto: "Finger Lickin' Good"
  },
  '3': {
    org_id: '3',
    org_name: 'McDonalds',
    motto: "I'm Lovin It"
  },
  '4': {
    org_id: '4',
    org_name: 'Subway',
    motto: 'Eat Fresh'
  }
};

export class Orgs {
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
  async getOrgs(): Promise<IOrg[]> {
    try {
      const allOrgs = await this.pool.query('SELECT * FROM orgs');
      return allOrgs.rows as IOrg[];
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getOrg(id: string): Promise<IOrg> {
    try {
      const theOrg = await this.pool.query(
        `SELECT * FROM orgs WHERE org_id IN ('${id}')`
      );
      return theOrg.rows[0] as IOrg;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async postOrg(id: string, name: string, motto: string): Promise<IOrg[]> {
    try {
      await this.pool.query(
        `INSERT INTO orgs (org_id, org_name, motto) VALUES ('${id}', '${name}', '${motto}')`
      );
      const allOrgs = await this.pool.query('SELECT * FROM orgs');
      return allOrgs.rows as IOrg[];
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async deleteOrg(id: string): Promise<boolean> {
    try {
      const diddelete = await this.pool.query(
        `DELETE FROM orgs where org_id = '${id}'`
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

  async updateOrg(id: string, name: string, motto: string): Promise<boolean> {
    try {
      const update = await this.pool.query(
        `UPDATE orgs SET org_name = '${name}', motto = '${motto}' WHERE org_id = '${id}'`
      );
      if (update) {
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getOrgUsers(id: string): Promise<IUserFromOrg[]> {
    try {
      const orgUsers = await this.pool.query(
        `SELECT user_id, username FROM users WHERE org_id IN ((SELECT org_id FROM users WHERE org_id IN ('${id}')))`
      );
      return orgUsers.rows as IUserFromOrg[];
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

const instance = new Orgs();
Object.freeze(instance);
export default instance;
