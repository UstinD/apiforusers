export interface IOrg {
  id: string;
  name: string;
  motto: string;
}

export const orgs: IOrg[] = [
  {
    id: '1',
    name: 'Nike',
    motto: 'Just Do it'
  },
  {
    id: '2',
    name: 'KFC',
    motto: "Finger Lickin' Good"
  },
  {
    id: '3',
    name: 'McDonalds',
    motto: "I'm Lovin It"
  },
  {
    id: '4',
    name: 'Subway',
    motto: 'Eat Fresh'
  }
];
