export type typeRoles = 'student' | 'author' | 'supervisor';
export type typeTaskState = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type typeReviewRequest = 'DRAFT' | 'PUBLISHED' | 'COMPLETED';
export type typeGrade = 'SELFGRADE' | 'EDIT' | 'REVIEW';
export type typeReview =
  | 'DRAFT'
  | 'PUBLISHED'
  | 'DISPUTED'
  | 'ACCEPTED'
  | 'REJECTED';
export type typeColorAction =
  | 'success'
  | 'processing'
  | 'default'
  | 'error'
  | 'warning';

export interface ITask {
  id?: string | number;
  title: string;
  author: string;
  categoriesOrder: string[];
  state: typeTaskState;
  items: ITaskItem[];
}

export interface IReviewRequest {
  id?: string | number;
  crossCheckSessionId: string;
  idTask: string;
  author: string;
  score: number;
  url: string;
  state: typeReviewRequest;
  selfGrade: ITaskOrderItems;
}

export interface IReview {
  id?: string | number;
  crossCheckSessionId: string;
  idTask: string;
  idRequest: string;
  author: string;
  score: number;
  state: typeReview;
  grade: ITaskOrderItems;
}

export interface ISelectTypeRoles {
  name: string;
  value: typeRoles;
}

export interface ISelectTypeStateTask {
  name: string;
  value: typeTaskState;
  color?: typeColorAction;
}

export interface ISelectTypeStateRequest {
  name: string;
  value: typeReviewRequest;
  color?: typeColorAction;
}

export interface ISelectTypeStateReviews {
  name: string;
  value: typeReview;
  color?: typeColorAction;
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

export interface IGradeItems {
  [key: string]: ITaskItem[];
}

export interface ITaskItemObj {
  [key: string]: ITaskItem[];
}

export interface ITaskOrderItems {
  [key: string]: ITaskItemScore;
}
