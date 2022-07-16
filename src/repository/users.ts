export interface IUser {
  id: string;
  name: string;
  email: string;
}

export const usersMap: { [key: string]: IUser } = {
  '1': {
    id: '1',
    name: 'John',
    email: 'john@gmail.com'
  },
  '2': {
    id: '2',
    name: 'Smith',
    email: 'smith@gmail.com'
  },
  '3': {
    id: '3',
    name: 'Chris',
    email: 'chris@gmail.com'
  },
  '4': {
    id: '4',
    name: 'Jack',
    email: 'jack@gmail.com'
  }
};
