export type typeRoles = 'student' | 'author' | 'supervisor';

export interface ISelectTypeRoles {
  name: string;
  value: typeRoles;
}

export interface IAuthValue {
  githubId: string;
  role: typeRoles;
}

export interface IItemTaskScore {
  score: number;
  comment: string;
}

export interface ICrossCheckItem {
  id: string;
  title: string;
  minScore: number;
  maxScore: number;
  order: string;
  description: string;
}

export interface ICrossCheckOrder {
  [key: string]: ICrossCheckItem[];
}

export interface ITaskItem {
  score: number;
  comment: string;
}

export interface ICrossCheckItems {
  items: ICrossCheckItem;
}
