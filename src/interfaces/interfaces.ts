export type typeRoles = 'student' | 'author' | 'supervisor';

export interface ISelectTypeRoles {
  name: string;
  value: typeRoles;
}

export interface IAuthValue {
  githubId: string;
  role: typeRoles;
}
