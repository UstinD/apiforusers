import { IUser } from './users';

export enum OrgType {
  PRIVATE = 'private',
  PUBLIC = 'public',
  NONPROFIT = 'non-profit'
}
export interface IOrg {
  id: string;
  name: string;
  orgType: OrgType;
  motto: string;
  users: IUser[];
}

// export const orgs: IOrg[] = [
//   {
//     id: '1',
//     name: 'Nike',
//     motto: 'Just Do it'
//   },
//   {
//     id: '2',
//     name: 'KFC',
//     motto: "Finger Lickin' Good"
//   },
//   {
//     id: '3',
//     name: 'McDonalds',
//     motto: "I'm Lovin It"
//   },
//   {
//     id: '4',
//     name: 'Subway',
//     motto: 'Eat Fresh'
//   }
// ];

// export const orgsMap = new Map<string, IOrg>();

// type mapForOrg = Map<string, IOrg>;

export const orgsMap: { [key: string]: IOrg } = {
  '1': {
    id: '1',
    name: 'Nike',
    orgType: OrgType.PUBLIC,
    motto: 'Just Do it',
    users: []
  },
  '2': {
    id: '2',
    name: 'KFC',
    orgType: OrgType.NONPROFIT,
    motto: "Finger Lickin' Good",
    users: []
  },
  '3': {
    id: '3',
    name: 'McDonalds',
    orgType: OrgType.PUBLIC,
    motto: "I'm Lovin It",
    users: []
  },
  '4': {
    id: '4',
    name: 'Subway',
    orgType: OrgType.PRIVATE,
    motto: 'Eat Fresh',
    users: []
  }
};
