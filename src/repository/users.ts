export interface IUser {
  id: string;
  name: string;
  email: string;
}

export const users: IUser[] = [
  {
    id: '1',
    name: 'John',
    email: 'john@gmail.com'
  },
  {
    id: '2',
    name: 'Smith',
    email: 'smith@gmail.com'
  },
  {
    id: '3',
    name: 'Chris',
    email: 'chris@gmail.com'
  },
  {
    id: '4',
    name: 'Jack',
    email: 'jack@gmail.com'
  }
];
