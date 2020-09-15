import {
  ISelectTypeRoles,
  ISelectTypeStateRequest,
  ISelectTypeStateReviews,
  ISelectTypeStateTask,
} from '../interfaces/interfaces';

export const listSelectTypeRoles: ISelectTypeRoles[] = [
  { value: 'author', name: 'Author' },
  { value: 'student', name: 'Student' },
  { value: 'supervisor', name: 'Supervisor' },
];

export const listStateTask: ISelectTypeStateTask[] = [
  { value: 'DRAFT', name: 'Черновик', color: 'warning' },
  { value: 'PUBLISHED', name: 'Опубликовано', color: 'success' },
  { value: 'ARCHIVED', name: 'Архив', color: 'default' },
];

export const listStateRequest: ISelectTypeStateRequest[] = [
  { value: 'DRAFT', name: 'Черновик', color: 'warning' },
  { value: 'PUBLISHED', name: 'Опубликовано', color: 'processing' },
  { value: 'COMPLETED', name: 'Выполнено', color: 'success' },
];

export const listStateReviews: ISelectTypeStateReviews[] = [
  { value: 'DRAFT', name: 'Черновик', color: 'warning' },
  { value: 'PUBLISHED', name: 'Опубликовано', color: 'processing' },
  { value: 'ACCEPTED', name: 'Принятно', color: 'success' },
  { value: 'DISPUTED', name: 'Спор', color: 'error' },
  { value: 'REJECTED', name: 'Отклонен', color: 'default' },
];
