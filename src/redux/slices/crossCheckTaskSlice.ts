import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import {
  ICrossCheckItem,
  ICrossCheckOrder,
  ITaskItem,
} from '../../interfaces/interfaces';

interface ITaskItemCheck {
  [key: string]: ITaskItem;
}

interface ICrossCheckState {
  items: ICrossCheckOrder;
  isLoading: boolean;
  task: string;
  total_score: number;
  score: number;
  task_items: ITaskItemCheck;
}

const initialState: ICrossCheckState = {
  items: {},
  isLoading: false,
  task: '',
  score: 0,
  total_score: 0,
  task_items: {},
};

interface solutionItem {
  id: string;
  score?: number;
  comment?: string;
}

const crossCheckTask = createSlice({
  name: 'crossCheckTask',
  initialState,
  reducers: {
    getcrossCheckTaskStart(state) {
      state.isLoading = true;
    },
    setSolution(state, action: PayloadAction<ITaskItemCheck>) {
      state.task_items = action.payload;
    },
    editItemsSolution(state, action: PayloadAction<solutionItem>) {
      const solution = action.payload;
      const key = Object.keys(solution).filter((s) => s !== 'id')[0];
      if (key === 'comment') {
        state.task_items[solution.id].comment = solution.comment;
      } else if (key === 'score' && typeof solution[key] === 'number') {
        state.task_items[solution.id].score = solution.score;
        let score = 0;
        Object.keys(state.task_items).forEach(
          (item) => (score += state.task_items[item].score)
        );
        state.score = score;
      }
    },
    setScore(state, action: PayloadAction<number>) {
      state.score = action.payload;
    },
    setTask(state, action: PayloadAction<string>) {
      state.task = action.payload;
    },
    setTaskOrder(state, action: PayloadAction<ICrossCheckOrder>) {
      state.isLoading = false;
      state.items = action.payload;
    },
    setTotalScore(state, action: PayloadAction<number>) {
      state.total_score = action.payload;
    },
  },
});

export const {
  getcrossCheckTaskStart,
  setScore,
  setTask,
  editItemsSolution,
  setTotalScore,
  setTaskOrder,
  setSolution,
} = crossCheckTask.actions;
export default crossCheckTask.reducer;

export const fetchCrossCheckTask = (): AppThunk => async (dispatch) => {
  const obj: ICrossCheckOrder = {};
  const objSolution: ITaskItemCheck = {};
  let score = 0;
  dispatch(getcrossCheckTaskStart());
  await setTimeout(() => {
    const task = testTask;
    task['items'].forEach((item: ICrossCheckItem) => {
      obj[item.order]
        ? (obj[item.order] = [...obj[item.order], item])
        : (obj[item.order] = [item]);
      objSolution[item.id] = { score: 0, comment: '' };
      score += item.maxScore;
    });
    dispatch(setSolution(objSolution));
    dispatch(setTask(task['id']));
    dispatch(setTotalScore(score));
    dispatch(setTaskOrder(obj));
  }, 1000);
};

export const sendTaskItems = (): AppThunk => async (dispatch) => {
  return;
};

const testTask = {
  id: 'simple-task-v1',
  author: 'cardamo',
  state: 'DRAFT', // enum [DRAFT, PUBLISHED, ARCHIVED]
  categoriesOrder: ['Basic Scope', 'Extra Scope', 'Fines'],
  items: [
    {
      id: 'id_1',
      title: 'title1_1',
      order: 'Basic Scope',
      minScore: 0,
      maxScore: 200,
      description: 'Description 111',
    },
    {
      id: 'id_2',
      title: 'title1_2',
      order: 'Basic Scope',
      minScore: 0,
      maxScore: 50,
      description: 'Description 1112',
    },
    {
      id: 'id_3',
      title: 'title1_3',
      order: 'Basic Scope',
      minScore: 0,
      maxScore: 70,
      description: 'Description 1113',
    },
    {
      id: 'id_21',
      title: 'title2_1',
      order: 'Extra Scope',
      minScore: 0,
      maxScore: 55,
      description: 'Description 111',
    },
    {
      id: 'id_22',
      title: 'title2_2',
      order: 'Extra Scope',
      minScore: 0,
      maxScore: 70,
      description: 'Description 113',
    },
    {
      id: 'id_23',
      title: 'title2_3',
      order: 'Extra Scope',
      minScore: 0,
      maxScore: 150,
      description:
        'Description 222Description 222Description 222Description 222Description 222Description 222',
    },
    {
      id: 'id_31',
      title: 'title3_1',
      order: 'Fines',
      minScore: 0,
      maxScore: 55,
      description: 'Description 111',
    },
    {
      id: 'id_32',
      title: 'title3_2',
      order: 'Fines',
      minScore: 0,
      maxScore: 122,
      description: 'Description 111',
    },
    {
      id: 'id_33',
      title: 'title3_3',
      order: 'Fines',
      minScore: 0,
      maxScore: 145,
      description: 'Description 111',
    },
  ],
};
