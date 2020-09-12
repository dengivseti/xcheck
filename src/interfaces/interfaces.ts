export type typeRoles = 'student' | 'author' | 'supervisor';

export interface ISelectTypeRoles {
  name: string;
  value: typeRoles;
}

export interface IAuthValue {
  githubId: string;
  role: typeRoles;
}

export interface ITaskItemScore {
  score: number;
  comment: string;
}

export interface ITaskItem {
  id: string;
  title: string;
  minScore: number;
  maxScore: number;
  order: string;
  description: string;
}

export interface ITaskItemObj {
  [key: string]: ITaskItem[];
}

export interface ITaskOrderItems {
  [key: string]: ITaskItemScore;
}
